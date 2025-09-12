import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

export default function QRGenerator() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [chatbotUrl, setChatbotUrl] = useState('');

  useEffect(() => {
    // Get the current URL and generate QR code
    const currentUrl = window.location.origin;
    setChatbotUrl(currentUrl);
    
    QRCode.toDataURL(currentUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#166534', // Green color for Basil & Beans
        light: '#FFFFFF'
      }
    })
    .then(url => {
      setQrCodeUrl(url);
    })
    .catch(err => {
      console.error('Error generating QR code:', err);
    });
  }, []);

  const downloadQR = () => {
    const link = document.createElement('a');
    link.download = 'basil-beans-qr-code.png';
    link.href = qrCodeUrl;
    link.click();
  };

  const printQR = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Basil & Beans - Table QR Code</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 20px;
              background: white;
            }
            .qr-container {
              border: 2px solid #166534;
              border-radius: 15px;
              padding: 30px;
              margin: 20px auto;
              max-width: 400px;
              background: #f0fdf4;
            }
            h1 { color: #166534; margin-bottom: 10px; }
            h2 { color: #059669; margin-bottom: 20px; }
            .instructions {
              margin-top: 20px;
              color: #374151;
              font-size: 14px;
              line-height: 1.5;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <h1>🌿 Basil & Beans ☕</h1>
            <h2>Scan to Order</h2>
            <img src="${qrCodeUrl}" alt="QR Code" style="max-width: 250px;" />
            <div class="instructions">
              <p><strong>How to order:</strong></p>
              <p>1. Scan this QR code with your phone camera</p>
              <p>2. Chat with our AI host about your preferences</p>
              <p>3. Get personalized menu recommendations</p>
              <p>4. Place your order with our staff</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-green-800 mb-2">🌿 Basil & Beans ☕</h1>
          <h2 className="text-xl text-green-600 mb-8">QR Code Generator</h2>
          
          {qrCodeUrl && (
            <div className="mb-8">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                <img 
                  src={qrCodeUrl} 
                  alt="Basil & Beans Chatbot QR Code" 
                  className="mx-auto mb-4"
                />
                <p className="text-sm text-green-700 mb-2">
                  <strong>Chatbot URL:</strong>
                </p>
                <p className="text-xs text-green-600 break-all bg-white p-2 rounded">
                  {chatbotUrl}
                </p>
              </div>
              
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={downloadQR}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                >
                  📥 Download QR Code
                </button>
                <button
                  onClick={printQR}
                  className="px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors font-medium"
                >
                  🖨️ Print Table Cards
                </button>
              </div>
            </div>
          )}
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-left">
            <h3 className="font-bold text-amber-800 mb-3">📋 Setup Instructions:</h3>
            <ol className="text-sm text-amber-700 space-y-2">
              <li><strong>1.</strong> Download or print the QR code above</li>
              <li><strong>2.</strong> Place QR codes on each table in your cafe</li>
              <li><strong>3.</strong> Add instructions: "Scan to chat with our AI host for personalized menu recommendations"</li>
              <li><strong>4.</strong> Make sure your OpenAI API key is configured in environment variables</li>
              <li><strong>5.</strong> Test the chatbot by scanning the QR code with your phone</li>
            </ol>
          </div>
          
          <div className="mt-6">
            <a 
              href="/"
              className="inline-block px-6 py-3 bg-green-100 text-green-800 rounded-xl hover:bg-green-200 transition-colors font-medium"
            >
              🤖 Test Chatbot
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}