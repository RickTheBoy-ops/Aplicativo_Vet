import 'dart:typed_data';

import 'package:intl/intl.dart';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:printing/printing.dart';

import '../domain/prescription_model.dart';

class PdfService {
  Future<Uint8List> generatePrescription(
    PrescriptionModel prescription,
  ) {
    final pdf = pw.Document();

    final formattedDate = DateFormat('dd/MM/yyyy').format(prescription.date);

    pdf.addPage(
      pw.Page(
        pageFormat: PdfPageFormat.a4,
        build: (pw.Context context) => pw.Column(
          crossAxisAlignment: pw.CrossAxisAlignment.start,
          children: [
            // Header
            pw.Header(
              level: 0,
              child: pw.Row(
                mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                children: [
                  pw.Text(
                    'VetField Pro',
                    style: pw.TextStyle(
                      fontSize: 24,
                      fontWeight: pw.FontWeight.bold,
                    ),
                  ),
                  pw.Column(
                    crossAxisAlignment: pw.CrossAxisAlignment.end,
                    children: [
                      pw.Text(prescription.vetName),
                      pw.Text('CRMV: ${prescription.crmv}'),
                    ],
                  ),
                ],
              ),
            ),
            pw.SizedBox(height: 20),

            // Patient Info
            pw.Container(
              padding: const pw.EdgeInsets.all(10),
              decoration: pw.BoxDecoration(
                border: pw.Border.all(),
                borderRadius: pw.BorderRadius.circular(4),
              ),
              child: pw.Column(
                crossAxisAlignment: pw.CrossAxisAlignment.start,
                children: [
                  pw.Text(
                    'Paciente: ${prescription.animalName}',
                    style: pw.TextStyle(fontWeight: pw.FontWeight.bold),
                  ),
                  pw.Text('Tutor: ${prescription.ownerName}'),
                  pw.Text('Data: $formattedDate'),
                ],
              ),
            ),
            pw.SizedBox(height: 20),

            // Diagnosis
            pw.Text(
              'Diagnóstico:',
              style: pw.TextStyle(
                fontWeight: pw.FontWeight.bold,
                fontSize: 16,
              ),
            ),
            pw.Text(prescription.diagnosis),
            pw.SizedBox(height: 20),

            // Medications
            pw.Text(
              'Prescrição:',
              style: pw.TextStyle(
                fontWeight: pw.FontWeight.bold,
                fontSize: 16,
              ),
            ),
            pw.ListView.builder(
              itemCount: prescription.medications.length,
              itemBuilder: (context, index) {
                final med = prescription.medications[index];
                return pw.Padding(
                  padding: const pw.EdgeInsets.symmetric(vertical: 5),
                  child: pw.Row(
                    children: [
                      pw.Bullet(),
                      pw.Expanded(
                        child: pw.Text(
                          '${med.name} - ${med.dosage}\n'
                          '${med.frequency} por ${med.duration}',
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
            pw.SizedBox(height: 20),

            // Observations
            if (prescription.observations.isNotEmpty)
              pw.Column(
                crossAxisAlignment: pw.CrossAxisAlignment.start,
                children: [
                  pw.Text(
                    'Observações:',
                    style: pw.TextStyle(
                      fontWeight: pw.FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                  pw.Text(prescription.observations),
                  pw.SizedBox(height: 40),
                ],
              ),

            // Signature
            pw.Spacer(),
            pw.Center(
              child: pw.Column(
                children: [
                  pw.Container(
                    width: 200,
                    height: 1,
                    color: PdfColors.black,
                  ),
                  pw.SizedBox(height: 5),
                  pw.Text('Assinatura do Veterinário'),
                ],
              ),
            ),
          ],
        ),
      ),
    );

    return pdf.save();
  }

  Future<void> sharePdf(Uint8List bytes, String filename) async {
    await Printing.sharePdf(bytes: bytes, filename: filename);
  }
}
