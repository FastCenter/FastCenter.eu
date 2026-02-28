const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer for CV uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

exports.uploadCV = multer({
    storage: storage,
    limits: { fileSize: 8 * 1024 * 1024 }, // 8MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos PDF'), false);
        }
    }
}).single('cv');

// Email Transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

exports.index = (req, res) => {
    res.render('index', {
        title: 'Inicio',
        successMessage: null,
        page: 'home'
    });
};

exports.cybersecurity = (req, res) => {
    res.render('services-cybersecurity', {
        title: 'Ciberseguridad',
        appName: process.env.APP_NAME || 'FastCenter',
        page: 'services-cybersecurity'
    });
};

exports.software = (req, res) => {
    res.render('services-software', {
        title: 'Desarrollo de Software',
        appName: process.env.APP_NAME || 'FastCenter',
        page: 'services-software'
    });
};

exports.web = (req, res) => {
    res.render('services-web', {
        title: 'Diseño y Desarrollo Web',
        appName: process.env.APP_NAME || 'FastCenter',
        page: 'services-web'
    });
};
exports.about = (req, res) => {
    res.render('about', {
        title: 'Nosotros',
        appName: process.env.APP_NAME || 'FastCenter',
        page: 'about'
    });
};

exports.careers = (req, res) => {
    res.render('careers', {
        title: 'Talento',
        appName: process.env.APP_NAME || 'FastCenter',
        page: 'careers'
    });
};

exports.contactPage = (req, res) => {
    res.render('contact', {
        title: 'Contacto',
        appName: process.env.APP_NAME || 'FastCenter',
        page: 'contact'
    });
};

exports.submitContact = async (req, res) => {
    const { name, email, message } = req.body || {};

    const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECEIVER || 'info@fastcenter.eu',
        subject: `Nuevo mensaje de contacto: ${name}`,
        replyTo: email,
        text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
        html: `
            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #ffffff; border-collapse: collapse; border: 1px solid #e5e7eb;">
                <tr>
                    <td colspan="2" style="background: linear-gradient(135deg, #001D3D 0%, #003566 100%); padding: 20px; text-align: left; border-bottom: 1px solid #e5e7eb;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 1px;">FastCenter</h1>
                        <p style="color: #60a5fa; margin: 5px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Nueva Consulta de Contacto</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f3f4f6; width: 140px; vertical-align: top;">
                        <span style="font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: bold; display: block;">Nombre</span>
                    </td>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f3f4f6; border-left: 1px solid #f3f4f6;">
                        <span style="font-size: 15px; color: #111827; font-weight: 600;">${name}</span>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f3f4f6; vertical-align: top;">
                        <span style="font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: bold; display: block;">Email</span>
                    </td>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f3f4f6; border-left: 1px solid #f3f4f6;">
                        <a href="mailto:${email}" style="font-size: 15px; color: #3b82f6; text-decoration: none;">${email}</a>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="padding: 20px; border-bottom: 1px solid #f3f4f6;">
                        <span style="font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: bold; display: block; margin-bottom: 10px;">Mensaje</span>
                        <div style="font-size: 15px; color: #374151; line-height: 1.6;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="background-color: #ffffff; padding: 15px 20px; text-align: left; font-size: 11px; color: #9ca3af;">
                        <p style="margin: 0;">Este es un mensaje automático generado desde el formulario de contacto de FastCenter.eu</p>
                        <p style="margin: 5px 0 0 0;">&copy; ${new Date().getFullYear()} FastCenter OÜ. Todos los derechos reservados.</p>
                    </td>
                </tr>
            </table>
        `
    };

    try {
        if (process.env.SMTP_HOST) {
            await transporter.sendMail(mailOptions);
        } else {
            console.log('--- Mail Simulation (No SMTP Config) ---');
            console.log(mailOptions);
        }

        res.render('index', {
            title: 'Inicio',
            successMessage: 'Gracias por contactarnos. Nos pondremos en contacto pronto.',
            page: 'home'
        });
    } catch (error) {
        console.error('ERROR AL ENVIAR EMAIL:', error);
        res.status(500).send(`Error al enviar el mensaje: ${error.message}. Verifica tu configuración SMTP.`);
    }
};

exports.submitCareers = (req, res) => {
    exports.uploadCV(req, res, async (err) => {
        if (err) {
            return res.status(400).send(err.message);
        }

        const { name, surname, email, phone } = req.body;
        const cvFile = req.file;

        if (!cvFile) {
            return res.status(400).send('Por favor, adjunte su CV en formato PDF.');
        }

        const mailOptions = {
            from: `"Talento: ${name} ${surname}" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_RECEIVER || 'info@fastcenter.eu',
            subject: `Nueva Candidatura: ${name} ${surname}`,
            replyTo: email,
            text: `Nombre: ${name} ${surname}\nEmail: ${email}\nTeléfono: ${phone || 'No proporcionado'}`,
            html: `
            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #ffffff; border-collapse: collapse; border: 1px solid #e5e7eb;">
                <tr>
                    <td colspan="2" style="background: linear-gradient(135deg, #001D3D 0%, #003566 100%); padding: 20px; text-align: left; border-bottom: 1px solid #e5e7eb;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 1px;">FastCenter</h1>
                        <p style="color: #60a5fa; margin: 5px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Nueva Candidatura Recibida</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f3f4f6; width: 140px; vertical-align: top;">
                        <span style="font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: bold; display: block;">Nombre</span>
                    </td>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f3f4f6; border-left: 1px solid #f3f4f6;">
                        <span style="font-size: 15px; color: #111827; font-weight: 600;">${name}</span>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f3f4f6; vertical-align: top;">
                        <span style="font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: bold; display: block;">Apellido</span>
                    </td>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f3f4f6; border-left: 1px solid #f3f4f6;">
                        <span style="font-size: 15px; color: #111827; font-weight: 600;">${surname}</span>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f3f4f6; vertical-align: top;">
                        <span style="font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: bold; display: block;">Email</span>
                    </td>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f3f4f6; border-left: 1px solid #f3f4f6;">
                        <a href="mailto:${email}" style="font-size: 15px; color: #3b82f6; text-decoration: none;">${email}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f3f4f6; vertical-align: top;">
                        <span style="font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: bold; display: block;">Teléfono</span>
                    </td>
                    <td style="padding: 15px 20px; border-bottom: 1px solid #f3f4f6; border-left: 1px solid #f3f4f6;">
                        <span style="font-size: 15px; color: #111827;">${phone || 'No proporcionado'}</span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="background-color: #ffffff; padding: 15px 20px; text-align: left; font-size: 11px; color: #9ca3af;">
                        <p style="margin: 0;">Este es un mensaje automático generado desde el portal de empleo de FastCenter.eu</p>
                        <p style="margin: 5px 0 0 0;">&copy; ${new Date().getFullYear()} FastCenter OÜ. Todos los derechos reservados.</p>
                    </td>
                </tr>
            </table>
        `
            ,
            attachments: [
                {
                    filename: cvFile.originalname,
                    path: cvFile.path
                }
            ]
        };

        try {
            if (process.env.SMTP_HOST) {
                await transporter.sendMail(mailOptions);
                // Bloque opcional: borrar el archivo después de enviar
                if (fs.existsSync(cvFile.path)) {
                    fs.unlinkSync(cvFile.path);
                }
            } else {
                console.log('--- Careers Submission Simulation ---');
                console.log(mailOptions);
            }

            res.render('index', {
                title: 'Inicio',
                successMessage: 'Candidatura enviada correctamente. ¡Gracias por tu interés!',
                page: 'home'
            });
        } catch (error) {
            console.error('ERROR AL ENVIAR CANDIDATURA:', error);
            res.status(500).send(`Error al enviar la candidatura: ${error.message}`);
        }
    });
};
