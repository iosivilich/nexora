const { GoogleGenerativeAI } = require("@google/generative-ai");

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

    // LIMPIEZA DE LLAVE: Eliminamos posibles espacios accidentales al inicio o final
    const rawKey = process.env.GEMINI_API_KEY || "";
    const cleanKey = rawKey.trim();

    if (!cleanKey || cleanKey.length < 10) {
        return res.status(500).json({
            error: 'API Key Missing or Invalid',
            message: 'La GEMINI_API_KEY parece estar vacía o mal configurada en Vercel. Por favor, asegúrate de haberla guardado correctamente.'
        });
    }

    try {
        const genAI = new GoogleGenerativeAI(cleanKey);

        // Usamos una configuración de modelo más compatible
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemPrompt = `
        Eres Nexa AI, el cerebro estratégico de Nexora. 
        Nexora es una startup que conecta consultores de élite con empresas.
        
        Contexto de la empresa:
        ${context.startupInfo || "Nexora conecta talento con retos corporativos."}
        
        Nuestros Consultores actuales:
        ${JSON.stringify(context.consultants || [])}
        
        Tu personalidad: Proactiva, visionaria, técnica pero cercana. Eres "el bro" del usuario, pero con un nivel profesional altísimo.
        Responde siempre en español. Si te preguntan por alguien del equipo, como Juan Contreras o iosivilich, descríbelos con entusiasmo.
        Si recomiendas un consultor, menciona por qué es el ideal basandote en sus habilidades.
        Mantén tus respuestas concisas y dinámicas. SIEMPRE usa un tono alentador y corporativo-moderno.
        `;

        // Construimos el historial inyectando el sistema como primer mensaje para mayor compatibilidad
        const chatHistory = [
            {
                role: "user",
                parts: [{ text: systemPrompt + "\n\nEntendido. Soy Nexa. ¿En qué puedo ayudarte?" }],
            },
            {
                role: "model",
                parts: [{ text: "¡Hola! Soy Nexa. Estoy lista para asistirte." }],
            }
        ];

        // Añadimos el historial previo si existe
        if (messages && messages.length > 1) {
            messages.slice(0, -1).forEach(m => {
                chatHistory.push({
                    role: m.role === 'user' ? 'user' : 'model',
                    parts: [{ text: m.content }],
                });
            });
        }

        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 800,
            },
        });

        const lastUserMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessage(lastUserMessage);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ text });
    } catch (error) {
        console.error("Gemini Error Detail:", error);
        res.status(500).json({
            error: 'AI Error',
            message: 'Error de Google: ' + error.message
        });
    }
};
