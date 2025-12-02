import 'package:flutter/material.dart';

class PaymentsScreen extends StatelessWidget {
  const PaymentsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Financeiro')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildPaymentItem('Consulta - Rex', 'R\$ 150,00', 'Pago', Colors.green),
          _buildPaymentItem('Vacina - Luna', 'R\$ 80,00', 'Pendente', Colors.orange),
          _buildPaymentItem('Exame - Thor', 'R\$ 200,00', 'Falhou', Colors.red),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        icon: const Icon(Icons.credit_card),
        label: const Text('Novo Cobrança'),
      ),
    );
  }

  Widget _buildPaymentItem(String title, String value, String status, Color color) {
    return Card(
      child: ListTile(
        leading: Icon(Icons.monetization_on, color: color),
        title: Text(title),
        subtitle: Text(status, style: TextStyle(color: color, fontWeight: FontWeight.bold)),
        trailing: Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
      ),
    );
  }
}
