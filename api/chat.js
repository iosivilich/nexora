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

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
            error: 'API Key not configured',
            message: 'Nexa está en modo offline porque no se ha detectado la GEMINI_API_KEY en las variables de entorno de Vercel.'
        });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const systemInstruction = `
        Eres Nexa AI, el cerebro estratégico de Nexora. 
        Nexora es una startup que conecta consultores de élite con empresas.
        
        Contexto de la empresa:
        ${context.startupInfo || "Nexora conecta talento con retos corporativos."}
        
        Nuestros Consultores actuales:
        ${JSON.stringify(context.consultants || [])}
        
        Tu personalidad: Proactiva, visionaria, técnica pero cercana. Eres "el bro" del usuario, pero con un nivel profesional altísimo.
        Responde siempre en español. Si te preguntan por alguien del equipo, como Juan Contreras o iosivilich, descríbelos con entusiasmo.
        Si recomiendas un consultor, menciona por qué es el ideal basándote en sus habilidades.
        Mantén tus respuestas concisas y dinámicas. Usa formato markdown para resaltar nombres (bold) y dar estructura.
        `;

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: systemInstruction
        });

        const history = (messages || []).slice(0, -1).map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
        }));

        const chat = model.startChat({
            history: history,
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const lastMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ text });
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({
            error: 'AI Error',
            message: 'Hubo un problema procesando tu mensaje con la IA. ' + error.message
        });
    }
};
