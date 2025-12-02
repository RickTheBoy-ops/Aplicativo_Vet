import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:provider/provider.dart';

import '../../../core/theme/app_colors.dart';
import '../../../data/models/user_model.dart';
import '../../../providers/vet_provider.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  // Posição inicial (Ex: São Paulo)
  static const CameraPosition _initialPosition = CameraPosition(
    target: LatLng(-23.550520, -46.633308),
    zoom: 12,
  );

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<VetProvider>().startLocationStream();
    });
  }

  @override
  void dispose() {
    context.read<VetProvider>().stopLocationStream();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final vets = context.watch<VetProvider>().vets;

    return Scaffold(
      body: Stack(
        children: [
          GoogleMap(
            initialCameraPosition: _initialPosition,
            myLocationEnabled: true,
            zoomControlsEnabled: false,
            markers: vets.map((UserModel vet) {
              final lat = vet.latitude ?? _initialPosition.target.latitude;
              final lng = vet.longitude ?? _initialPosition.target.longitude;
              return Marker(
                markerId: MarkerId(vet.id),
                position: LatLng(lat, lng),
                infoWindow: InfoWindow(
                  title: vet.name,
                  snippet: vet.specialties?.join(', '),
                ),
              );
            }).toSet(),
          ),

          // Barra de busca flutuante
          Positioned(
            top: MediaQuery.of(context).padding.top + 16,
            left: 16,
            right: 16,
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(8),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withAlpha(26), // Correção de opacidade
                    blurRadius: 10,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: TextField(
                decoration: const InputDecoration(
                  hintText: 'Buscar veterinários...',
                  prefixIcon: Icon(Icons.search, color: AppColors.textLight),
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 14,
                  ),
                ),
                onChanged: (value) {
                  // TODO(user): Implementar busca
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}
