import PdfDocument from 'pdfkit';
import PdfTable from 'voilab-pdf-table';

export const createPdf = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pdf = new PdfDocument({ autoFirstPage: false });
      const table = new PdfTable(pdf, { bottomMargin: 30 });
      
      const FitColumnPlugin = (await import('voilab-pdf-table/plugins/fitcolumn.js')).default;

      // Buffer array to store chunks of data
      const chunks = [];
      pdf.on('data', (chunk) => chunks.push(chunk)); // Collect each data chunk
      pdf.on(' 5', () => resolve(Buffer.concat(chunks))); // Resolve with complete buffer
      pdf.on('error', reject); // Reject on error

      // Set up table and apply the FitColumnPlugin dynamically
      table
        .addPlugin(new FitColumnPlugin({ column: 'description' }))
        .setColumnsDefaults({ headerBorder: 'B', align: 'right' })
        .addColumns([
          { id: 'description', header: 'Product', align: 'left' },
          { id: 'quantity', header: 'Quantity', width: 50 },
          { id: 'price', header: 'Price', width: 40 },
          {
            id: 'total',
            header: 'Total',
            width: 70,
            renderer: (tb, rowData) => `CHF ${rowData.total}`
          }
        ])
        .onPageAdded(() => table.addHeader());

      // Add a page to start the PDF content
      pdf.addPage();

      // Draw table content by passing data to addBody
      table.addBody(data);

      // Finalize the PDF and signal end of data collection
      pdf.end();

    } catch (error) {
      reject(error); // Reject if an error occurs
    }
  });
};
