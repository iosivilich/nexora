module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages, context } = req.body;
    const apiKey = (process.env.GEMINI_API_KEY || "").trim();

    // Verificación de seguridad de la llave
    if (!apiKey || apiKey.length < 10) {
        return res.status(500).json({
            error: 'Configuración Incompleta',
            message: 'No se detectó la GEMINI_API_KEY. Asegúrate de que el nombre en Vercel sea exactamente GEMINI_API_KEY y que hayas guardado los cambios.'
        });
    }

    try {
        const systemPrompt = `Eres Nexa AI, el cerebro estratégico de Nexora. 
        Startup: Nexora conecta consultores de élite con empresas.
        Contexto: ${context.startupInfo}
        Consultores: ${JSON.stringify(context.consultants)}
        Personalidad: Proactiva, visionaria, nivel experto. Responde en español de forma dinámica.`;

        const lastMessage = messages[messages.length - 1].content;

        // --- LLAMADA DIRECTA POR HTTP (Sin librerías intermedias) ---
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: systemPrompt + "\n\nUsuario: " + lastMessage }]
                }],
                generationConfig: {
                    maxOutputTokens: 800,
                    temperature: 0.7
                }
            })
        });

        const data = await response.json();

        // Si Google devuelve un error en el JSON
        if (data.error) {
            throw new Error(`Google API: ${data.error.message} (${data.error.status})`);
        }

        if (data.candidates && data.candidates[0].content) {
            const text = data.candidates[0].content.parts[0].text;
            res.status(200).json({ text });
        } else {
            throw new Error("Respuesta incompleta de la IA");
        }

    } catch (error) {
        console.error("Critical AI Error:", error.message);
        res.status(500).json({
            error: 'Error de Conexión',
            message: 'Nexa está teniendo problemas técnicos: ' + error.message
        });
    }
};
