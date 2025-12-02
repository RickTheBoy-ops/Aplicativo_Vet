import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class VideoCallScreen extends StatefulWidget {
  const VideoCallScreen({super.key});

  @override
  State<VideoCallScreen> createState() => _VideoCallScreenState();
}

class _VideoCallScreenState extends State<VideoCallScreen> {
  bool _isMuted = false;
  bool _isVideoOff = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // Main Video (Remote)
          Center(
            child: Container(
              color: Colors.grey[800],
              child: const Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(Icons.person, size: 100, color: Colors.white54),
                    SizedBox(height: 16),
                    Text('Conectando...', style: TextStyle(color: Colors.white)),
                    // TODO: Integrate Agora/Twilio SDK here
                  ],
                ),
              ),
            ),
          ),
          
          // Local Video (Picture in Picture)
          Positioned(
            right: 16,
            top: 48,
            child: Container(
              width: 100,
              height: 150,
              decoration: BoxDecoration(
                color: Colors.black,
                border: Border.all(color: Colors.white),
                borderRadius: BorderRadius.circular(8),
              ),
              child: _isVideoOff
                  ? const Icon(Icons.videocam_off, color: Colors.white)
                  : const Center(child: Text('Você', style: TextStyle(color: Colors.white))),
            ),
          ),

          // Controls
          Positioned(
            bottom: 32,
            left: 0,
            right: 0,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                IconButton(
                  onPressed: () => setState(() => _isMuted = !_isMuted),
                  icon: Icon(_isMuted ? Icons.mic_off : Icons.mic),
                  style: IconButton.styleFrom(
                    backgroundColor: _isMuted ? Colors.white : Colors.grey[800],
                    foregroundColor: _isMuted ? Colors.black : Colors.white,
                    padding: const EdgeInsets.all(12),
                  ),
                ),
                IconButton(
                  onPressed: () => context.pop(),
                  icon: const Icon(Icons.call_end),
                  style: IconButton.styleFrom(
                    backgroundColor: Colors.red,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.all(16),
                  ),
                ),
                IconButton(
                  onPressed: () => setState(() => _isVideoOff = !_isVideoOff),
                  icon: Icon(_isVideoOff ? Icons.videocam_off : Icons.videocam),
                  style: IconButton.styleFrom(
                    backgroundColor: _isVideoOff ? Colors.white : Colors.grey[800],
                    foregroundColor: _isVideoOff ? Colors.black : Colors.white,
                    padding: const EdgeInsets.all(12),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
