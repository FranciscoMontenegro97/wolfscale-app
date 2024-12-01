import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';


interface SpanData {
  weight: string;
  count: string;
}

interface CalculationResult {
  weight: number;
  netCount: number;
  countsPerKg: number;
  adjustmentValue: number;
  finalValue: number;
}

interface FormData {
  zeroCount: string;
  mainSpan: SpanData;
  additionalSpans: SpanData[];
  percentageCalculations: Array<{ weight: string; percentage: string }>;
  results?: CalculationResult[];
}

export const generatePDF = async (formData: FormData, results: CalculationResult[]) => {
  try {
    // Crear el HTML para el PDF
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial; padding: 20px; }
            h1 { color: #222831; }
            .result-card { 
              background: #f5f5f5;
              padding: 15px;
              margin: 10px 0;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <h1>Informe de Calibración</h1>
          <p><strong>Conteo de Cero:</strong> ${formData.zeroCount}</p>
          
          <h2>Resultados:</h2>
          ${results.map((result, index) => `
            <div class="result-card">
              <h3>Span ${index + 1}</h3>
              <p><strong>Peso:</strong> ${result.weight} kg</p>
              <p><strong>Conteo Neto:</strong> ${result.netCount}</p>
              <p><strong>Cuentas/kg:</strong> ${result.countsPerKg.toFixed(4)}</p>
              <p><strong>Valor Ajuste:</strong> ${result.adjustmentValue}</p>
              <p><strong>Valor Final:</strong> ${result.finalValue}</p>
            </div>
          `).join('')}
          
          <p style="margin-top: 30px; color: #666;">
            Fecha: ${new Date().toLocaleDateString()}
          </p>
        </body>
      </html>
    `;

    // Generar el PDF
    const { uri } = await Print.printToFileAsync({
      html,
      base64: false
    });

    return uri;
  } catch (error) {
    console.error('Error generando PDF:', error);
    throw new Error('Error al generar el PDF');
  }
};

export const sharePDF = async (uri: string) => {
  try {
    await Sharing.shareAsync(uri, {
      UTI: '.pdf',
      mimeType: 'application/pdf'
    });
  } catch (error) {
    throw new Error('Error al compartir el PDF');
  }
};