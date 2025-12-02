import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:printing/printing.dart';

import '../data/pdf_service.dart';
import '../domain/prescription_model.dart';

class PrescriptionScreen extends StatefulWidget {
  const PrescriptionScreen({super.key});

  @override
  State<PrescriptionScreen> createState() => _PrescriptionScreenState();
}

class _PrescriptionScreenState extends State<PrescriptionScreen> {
  final _formKey = GlobalKey<FormState>();
  final _animalController = TextEditingController();
  final _ownerController = TextEditingController();
  final _diagnosisController = TextEditingController();
  final _obsController = TextEditingController();
  
  // Simple list for medications (usually dynamic)
  final _medNameController = TextEditingController();
  final _medDosageController = TextEditingController();
  final _medFreqController = TextEditingController();
  final _medDurationController = TextEditingController();

  final PdfService _pdfService = PdfService();

  Future<void> _generatePdf() async {
    if (_formKey.currentState!.validate()) {
      HapticFeedback.heavyImpact();
      final prescription = PrescriptionModel(
        vetName: 'Dr. João Silva', // Mocked user
        crmv: '12345-SP',
        animalName: _animalController.text,
        ownerName: _ownerController.text,
        diagnosis: _diagnosisController.text,
        medications: [
          Medication(
            name: _medNameController.text,
            dosage: _medDosageController.text,
            frequency: _medFreqController.text,
            duration: _medDurationController.text,
          ),
        ],
        observations: _obsController.text,
        date: DateTime.now(),
      );

      await Printing.layoutPdf(
        onLayout: (format) => _pdfService.generatePrescription(prescription),
      );
    }
  }

  @override
  Widget build(BuildContext context) => Scaffold(
      appBar: AppBar(title: const Text('Receituário Digital')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Dados do Paciente', style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: 16),
              TextFormField(
                controller: _animalController,
                decoration: const InputDecoration(labelText: 'Nome do Animal'),
                validator: (v) => v!.isEmpty ? 'Obrigatório' : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _ownerController,
                decoration: const InputDecoration(labelText: 'Nome do Tutor'),
                validator: (v) => v!.isEmpty ? 'Obrigatório' : null,
              ),
              const SizedBox(height: 24),
              Text('Diagnóstico', style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: 16),
              TextFormField(
                controller: _diagnosisController,
                decoration: const InputDecoration(labelText: 'Diagnóstico'),
                maxLines: 2,
                validator: (v) => v!.isEmpty ? 'Obrigatório' : null,
              ),
              const SizedBox(height: 24),
              Text('Medicamento (Exemplo Único)', style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: 16),
              TextFormField(
                controller: _medNameController,
                decoration: const InputDecoration(labelText: 'Nome do Medicamento'),
                validator: (v) => v!.isEmpty ? 'Obrigatório' : null,
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      controller: _medDosageController,
                      decoration: const InputDecoration(labelText: 'Dosagem'),
                      validator: (v) => v!.isEmpty ? 'Obrigatório' : null,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: TextFormField(
                      controller: _medFreqController,
                      decoration: const InputDecoration(labelText: 'Frequência'),
                      validator: (v) => v!.isEmpty ? 'Obrigatório' : null,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _medDurationController,
                decoration: const InputDecoration(labelText: 'Duração'),
                validator: (v) => v!.isEmpty ? 'Obrigatório' : null,
              ),
              const SizedBox(height: 24),
              TextFormField(
                controller: _obsController,
                decoration: const InputDecoration(labelText: 'Observações'),
                maxLines: 3,
              ),
              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: _generatePdf,
                  icon: const Icon(Icons.picture_as_pdf),
                  label: const Text('Gerar e Compartilhar PDF'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
}
