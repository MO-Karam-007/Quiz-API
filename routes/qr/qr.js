const QRCode = require('qrcode');

async function generateQRCode(req, res) {
    try {
        const data = req.body.qr;
        const data1 = 'mohamed karam';
        var options = {
            errorCorrectionLevel: 'H', // Higher error correction level for better readability
            type: 'image/png', // QR code image format (e.g., PNG)
            width: 300, // QR code image width in pixels
            margin: 1, // White margin around the QR code
        };

        console.log(`ddd`);
        // Generate the QR code as a Data URI
        const qrCodeDataURI = await QRCode.toDataURL(data1, options);
        // image = qrCodeDataURI.replace(/^data:image\/png;base64,/, '');
        // res.writeHead(200, {
        //     'Content-Type': 'image/png',
        //     'Content-Length': qrCodeDataURI.length,
        // });
        // res.end(Buffer.from(qrCodeDataURI, 'base64'));

        // res.send(image);
        res.send(qrCodeDataURI);
        // res.send(image);
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = { generateQRCode };
