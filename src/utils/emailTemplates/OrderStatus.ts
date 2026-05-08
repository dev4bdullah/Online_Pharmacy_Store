export function ChangeOrderStatus(order:any) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Order Summary</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
        <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
          .container { max-width: 700px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .header { background: black; color: #fff; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { text-align: center; font-size: 14px; color: #888; padding: 10px; background: #f4f4f4; }
          .btn-download { margin-top: 20px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 8px; border: 1px solid #ccc; text-align: left; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header"><h1>Order Summary</h1></div>
          <div class="content" id="reportContent">
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Status:</strong> ${order?.orderStatus}</p>
            <p><strong>Payment:</strong> ${order?.paymentMethod} (${order.paymentStatus})</p>
            <p><strong>Shipping Address:</strong> ${order?.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}</p>
  
            <table>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${order?.items?.map(item => `
                  <tr>
                    <td>${item.productId}</td>
                    <td>${item.quantity}</td>
                    <td>${item?.price?.toFixed(2)} Rs</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
  
            <p><strong>Total:</strong>${order.totalAmount.toFixed(2)} Rs</p>
         
          </div>
          <div class="footer">
            <p>&copy; 2024 Zahid Pharmacy. All rights reserved.</p>
            <p><a href="mailto:syedabdullahayaz175@gmail.com">Contact Support</a></p>
          </div>
        </div>
  
        <script>
          async function downloadPDF(order) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            let y = 20;
  
            doc.setFontSize(18);
            doc.setFont("helvetica", "bold");
            doc.text("Order Summary", 105, y, { align: "center" });
            y += 15;
  
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            const address = \`\${order.shippingAddress.street}, \${order.shippingAddress.city}, \${order.shippingAddress.state} \${order.shippingAddress.postalCode}, \${order.shippingAddress.country}\`;
            doc.text(\`Order ID: \${order._id}\`, 20, y); y += 8;
            doc.text(\`Status: \${order.orderStatus}\`, 20, y); y += 8;
            doc.text(\`Payment: \${order.paymentMethod} (\${order.paymentStatus})\`, 20, y); y += 8;
            doc.text(\`Shipping: \${address}\`, 20, y); y += 12;
  
            doc.setFont("helvetica", "bold");
            doc.text("Items", 20, y); y += 8;
            doc.text("Product ID", 20, y);
            doc.text("Qty", 100, y);
            doc.text("Price", 120, y);
            y += 7;
  
            doc.setFont("helvetica", "normal");
            order.items.forEach(item => {
              doc.text(item.productId.toString(), 20, y);
              doc.text(item.quantity.toString(), 100, y);
              doc.text(\`$\${item.price.toFixed(2)}\`, 120, y);
              y += 8;
            });
  
            y += 4;
            doc.setFont("helvetica", "bold");
            doc.text(\`Total: $\${order.totalAmount.toFixed(2)}\`, 20, y); y += 8;
            doc.text(\`Payment Gateway: \${order.transactionDetails.paymentGateway} (Transaction ID: \${order.transactionDetails.transactionId})\`, 20, y);
  
            doc.save("order-report.pdf");
          }
        </script>
      </body>
      </html>
    `;
  }
  