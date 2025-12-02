import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ManagementScreen extends StatelessWidget {
  const ManagementScreen({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text('Gestão & Dashboard')),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // KPI Cards
              Row(
                children: [
                  Expanded(
                    child: _buildKpiCard(
                      context,
                      'Atendimentos',
                      '12',
                      Colors.blue,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: _buildKpiCard(
                      context,
                      'Faturamento',
                      r'R$ 4.5k',
                      Colors.green,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: _buildKpiCard(
                      context,
                      'Pendentes',
                      '3',
                      Colors.orange,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: _buildKpiCard(
                      context,
                      'Novos Clientes',
                      '5',
                      Colors.purple,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 32),

              // Actions
              const Text(
                'Ações Rápidas',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),
              _buildActionTile(
                context,
                'Relatórios e Analytics',
                Icons.bar_chart,
                Colors.indigo,
                () => context.go('/management/analytics'),
              ),
              _buildActionTile(
                context,
                'Financeiro & Pagamentos',
                Icons.attach_money,
                Colors.green,
                () => context.go('/management/payments'),
              ),
              _buildActionTile(
                context,
                'Agendamento Inteligente (IA)',
                Icons.calendar_month,
                Colors.teal,
                () => context.go('/management/scheduling'),
              ),
              _buildActionTile(
                context,
                'Backup & Sincronização',
                Icons.cloud_sync,
                Colors.blueGrey,
                () => _showSyncDialog(context),
              ),
            ],
          ),
        ),
      );

  Widget _buildKpiCard(
    BuildContext context,
    String title,
    String value,
    Color color,
  ) =>
      Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withAlpha(26),
              blurRadius: 10,
            ),
          ],
          border: Border.all(color: Colors.grey.shade200),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: TextStyle(
                color: Colors.grey[600],
                fontSize: 12,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              value,
              style: TextStyle(
                color: color,
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      );

  Widget _buildActionTile(
    BuildContext context,
    String title,
    IconData icon,
    Color color,
    VoidCallback onTap,
  ) =>
      Card(
        margin: const EdgeInsets.only(bottom: 12),
        child: ListTile(
          leading: CircleAvatar(
            backgroundColor: color.withAlpha(26),
            child: Icon(icon, color: color),
          ),
          title:
              Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
          trailing: const Icon(Icons.arrow_forward_ios, size: 16),
          onTap: onTap,
        ),
      );

  void _showSyncDialog(BuildContext context) {
    showDialog<void>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Sincronização'),
        content: const Row(
          children: [
            CircularProgressIndicator(),
            SizedBox(width: 16),
            Text('Sincronizando dados...'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
        ],
      ),
    );
    // Mock completion
    Future.delayed(const Duration(seconds: 2), () {
      if (context.mounted) {
        Navigator.pop(context);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Dados sincronizados com sucesso!')),
        );
      }
    });
  }
}
