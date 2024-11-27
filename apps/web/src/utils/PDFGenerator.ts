// src/utils/pdfGenerator.ts
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { PDFData } from '../types/PDF';

export const generatePDF = (data: PDFData): void => {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(20);
  doc.setTextColor(48, 71, 94); // color-primary-blue
  doc.text('Informe de Calibración', 20, 20);

  // Tabla de Resultados
  doc.autoTable({
    head: [['Peso (kg)', 'Conteo Neto', 'Cuentas/kg', 'Valor Ajuste', 'Valor Final']],
    body: data.results.map(r => [
      r.weight,
      r.netCount,
      r.countsPerKg.toFixed(4),
      r.adjustmentValue,
      r.finalValue
    ]),
    startY: 40,
    styles: { textColor: [34, 40, 49] }, // color-primary-black
    headStyles: { fillColor: [48, 71, 94] }, // color-primary-blue
  });

  // Cálculos de Porcentaje
  if (data.percentageCalculations?.length) {
    const finalY = (doc as any).lastAutoTable.finalY || 40;
    doc.setFontSize(14);
    doc.text('Cálculos de Porcentaje', 20, finalY + 20);

    doc.autoTable({
      head: [['Peso Base (kg)', 'Porcentaje (%)', 'Resultado (kg)']],
      body: data.percentageCalculations.map(calc => [
        calc.weight,
        calc.percentage,
        calc.result
      ]),
      startY: finalY + 30,
      styles: { textColor: [34, 40, 49] },
      headStyles: { fillColor: [48, 71, 94] }
    });
  }

  // Pie de página
  const pageCount = doc.getNumberOfPages();
  doc.setFontSize(10);
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      `Página ${i} de ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  doc.save('calibracion.pdf');
};