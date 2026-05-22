// Free, CORS-enabled demo audio. Replace with your own catalog when ready.
export const TRACKS = [
  { id: "lofi-1", title: "Lo-Fi Deep Focus", artist: "FlowState Mix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80", source: "Local" as const },
  { id: "lofi-2", title: "Midnight Study", artist: "FlowState Mix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80", source: "Local" as const },
  { id: "lofi-3", title: "Calm Sprint", artist: "FlowState Mix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80", source: "Local" as const },
  { id: "lofi-4", title: "Rainfall Theta", artist: "FlowState Mix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80", source: "Local" as const },
];

export const AMBIENT_URLS: Record<string, string> = {
  Rain: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8cb749cc1c.mp3",
  Thunder: "https://cdn.pixabay.com/download/audio/2022/10/30/audio_347d2e44e7.mp3",
  "Ocean Waves": "https://cdn.pixabay.com/download/audio/2021/09/06/audio_2dde668ca0.mp3",
  Wind: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_d0c6ff1bab.mp3",
  "White Noise": "https://cdn.pixabay.com/download/audio/2021/08/09/audio_dc39bbc1cf.mp3",
  "Café": "https://cdn.pixabay.com/download/audio/2022/03/10/audio_4c01b3a01b.mp3",
  Fireplace: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1bab.mp3",
  "Theta Waves": "https://cdn.pixabay.com/download/audio/2022/02/07/audio_dc39bbc1cf.mp3",
  "Delta Waves": "https://cdn.pixabay.com/download/audio/2022/02/07/audio_dc39bbc1cf.mp3",
};

export const ENVIRONMENTS: { name: string; mix: { sound: string; vol: number }[]; cover: string }[] = [
  { name: "Mountain Lake", cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", mix: [{ sound: "Wind", vol: 40 }, { sound: "Ocean Waves", vol: 30 }] },
  { name: "Rainy Café", cover: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80", mix: [{ sound: "Rain", vol: 55 }, { sound: "Café", vol: 50 }] },
  { name: "Cozy Night Room", cover: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80", mix: [{ sound: "Fireplace", vol: 60 }, { sound: "Rain", vol: 25 }] },
  { name: "Forest Ambience", cover: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80", mix: [{ sound: "Wind", vol: 35 }, { sound: "Rain", vol: 20 }] },
  { name: "Sunset Workspace", cover: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&q=80", mix: [{ sound: "White Noise", vol: 30 }, { sound: "Theta Waves", vol: 40 }] },
  { name: "Library", cover: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80", mix: [{ sound: "White Noise", vol: 25 }, { sound: "Café", vol: 20 }] },
];
