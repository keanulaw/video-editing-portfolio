import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: '1',
      title: 'Serious Short',
      category: 'Short Form',
      type: 'drive',
      videoId: '1h3w_7NTVTj9UMzs94Cj7qAj4f61yzHk4',
      thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80',
      description: 'Impactful short-form content with serious tone'
    },
    {
      id: '2',
      title: 'Comedy Short',
      category: 'Short Form',
      type: 'drive',
      videoId: '1ab_mV0eU5DUSAK9XUVfp-BBZtEgatxar',
      thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80',
      description: 'Entertaining short-form content with comedic elements'
    },
    {
      id: '3',
      title: 'Voice Over B-Roll',
      category: 'Long Form',
      type: 'drive',
      videoId: '1tfFOu3tqEaMO0Euchu6n-WXOT1fNfg2Q',
      thumbnail: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80',
      description: 'Professional voice-over narration with cinematic B-roll footage'
    },
    {
      id: '4',
      title: 'Talking Head Video',
      category: 'Long Form',
      type: 'youtube',
      videoId: 'HeIcNepnqXY',
      thumbnail: 'https://img.youtube.com/vi/HeIcNepnqXY/maxresdefault.jpg',
      description: 'Engaging long-form content with on-camera presentation'
    },
    {
      id: '5',
      title: 'Gaming Content',
      category: 'Long Form',
      type: 'youtube',
      videoId: 'n-OAW9e92Sw',
      thumbnail: 'https://img.youtube.com/vi/n-OAW9e92Sw/maxresdefault.jpg',
      description: 'Dynamic gaming video with commentary and editing'
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState(null);

  const skills = [
    'DaVinci Resolve',
    'Color Grading',
    'Motion Graphics',
    'Sound Design',
    'Video Compression'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Cinematic background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.8),rgba(0,0,0,1))]"></div>
        <div className="film-grain"></div>
        <div className="vignette"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 animate-fade-in">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-red-600 rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">Shannon</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#work" className="hover:text-amber-500 transition-colors duration-300">Work</a>
            <a href="#about" className="hover:text-amber-500 transition-colors duration-300">About</a>
            <a href="#contact" className="hover:text-amber-500 transition-colors duration-300">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center z-10">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="inline-block mb-4 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
              <span className="text-amber-500 text-sm font-medium tracking-wider">VIDEO EDITOR & STORYTELLER</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 animate-slide-up leading-tight" style={{ animationDelay: '0.2s' }}>
            Crafting Stories
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-red-600">
              Frame by Frame
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '0.3s' }}>
            Transforming raw footage into compelling narratives that captivate, inspire, and leave lasting impressions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <a 
              href="#work" 
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-red-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold hover:bg-white/5 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Decorative film strips */}
        <div className="absolute top-0 left-0 w-full h-20 film-strip opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 film-strip opacity-20"></div>
      </section>

      {/* Portfolio Grid */}
      <section id="work" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-600">Projects</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A showcase of my recent work across various genres and formats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/50 transition-all duration-500 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedVideo(project)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 backdrop-blur-sm border-2 border-amber-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500/30 transition-all duration-300">
                      <svg className="w-8 h-8 text-amber-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-amber-500 tracking-wider uppercase">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400">
                    {project.description}
                  </p>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-500/0 group-hover:border-amber-500/50 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6 bg-gradient-to-br from-gray-950 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-600">Me</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  I'm a passionate video editor with a keen eye for storytelling and visual aesthetics. With years of experience crafting compelling narratives, I specialize in transforming raw footage into polished, engaging content.
                </p>
                <p>
                  My approach combines technical expertise with creative vision, ensuring every project resonates with its intended audience. From corporate videos to creative content, I bring dedication and artistry to every frame.
                </p>
                <p>
                  I believe great editing is invisible—it serves the story without drawing attention to itself. Let's collaborate to bring your vision to life.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-8">Skills & Tools</h3>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="px-6 py-4 bg-gradient-to-br from-gray-900 to-gray-950 border border-white/10 rounded-xl hover:border-amber-500/50 transition-all duration-300 text-center font-medium"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Let's Create Something
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-600">
              Amazing Together
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Ready to bring your project to life? Get in touch and let's discuss how we can collaborate.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="mailto:your.email@example.com"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-red-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Email Me : shannonkeanu1@gmail.com
            </a>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>&copy; 2025 Shannon Yase. All rights reserved.</p>
        </div>
      </footer>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="max-w-6xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-amber-500 transition-colors duration-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="bg-gray-900 rounded-2xl overflow-hidden border border-white/10">
              <div className="aspect-video">
                {selectedVideo.type === 'drive' ? (
                  <iframe
                    src={`https://drive.google.com/file/d/${selectedVideo.videoId}/preview`}
                    className="w-full h-full"
                    allow="autoplay"
                    title={selectedVideo.title}
                  ></iframe>
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={selectedVideo.title}
                  ></iframe>
                )}
              </div>
              <div className="p-8">
                <div className="mb-2">
                  <span className="text-sm font-semibold text-amber-500 tracking-wider uppercase">
                    {selectedVideo.category}
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-4">{selectedVideo.title}</h3>
                <p className="text-gray-400 text-lg">{selectedVideo.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;