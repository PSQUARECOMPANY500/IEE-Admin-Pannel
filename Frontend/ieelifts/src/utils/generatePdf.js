import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
const generatePdf = (data) => {
    const doc = new jsPDF();
    
    if (data) {
      const tableColumn = ["JON", "NAME", "NUMBER", "ADDRESS", "MEMBERSHIP","MODEL","DOH"];
      const tableRows = [];

      data.forEach(user => {
        const userData = [
          user.JobOrderNumber,
          user.name,
          user.PhoneNumber,
          user.Address,
          user.MembershipType,
          user.ModelType,
          user.DateOfHandover
        ];
        tableRows.push(userData);
      });
      doc.text("Client's Data", 14, 15);
      doc.autoTable(tableColumn, tableRows, { startY: 20 });
      
    } else {
      doc.text('No data available', 10, 10);
    }

    doc.save(`client-data-${new Date().getTime()}.pdf`);
  };
  export default generatePdf;