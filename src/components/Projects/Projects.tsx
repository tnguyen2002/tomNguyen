import "./Projects.css";

interface Project {
  Name: string;
  Link?: string;
  Description: string[];
  Website?: string;
  Poster?: string;
  Report?: string;
  Demo?: string;
}

function Projects() {
  const fillerProjects: Project[] = [
    {
      Name: "GANDALF-MD",
      Description: [
        "Developed a GAN training method for medical imagery that integrates learned augmentations from Viewmaker Networks with DiffAugment’s differentiable augmentation framework.",
        "Improved image quality for multiple medical imaging modalities: skin lesions, pathology tissue slides, and retinal fundus images",
      ],
      Link: "https://github.com/tnguyen2002/GANDALF-MD", // Code
      Report:
        "https://drive.google.com/file/d/1GceUlrLSWwjQF4A8ZsDxrUjCclLImul6/view", // Report
      Poster:
        "https://drive.google.com/file/d/1pJD2CZyGIRjJHr-gOd51RXHqrIPGzzMn/view", // Poster
      Demo: "", // Demo
    },
    {
      Name: "Pathology WSI Embeddings via Multimodal Language Guided Self-Supervision",
      Description: [
        "Self-supervised interpretable pathology whole slide image embeddings using OpenAI’s CLIP contrastive learning framework and a patched based co-attention mechanism, using over 20,000+ patch images",
      ],
      Report:
        "https://drive.google.com/file/d/1MHXvMp6agYfCFgQhjY0hVtAGmzVqRETS/view?usp=sharing", // Report
      Poster:
        "https://drive.google.com/file/d/1WZ8pqc72-EwrebfYIxAU02sDzleQGo3p/view", // Poster
      Demo: "", // Demo
    },
    {
      Name: "AWS Trainium Convolutions",
      Description: [
        "Developed a fused convolution + max-pool kernel on the AWS Trainium (NeuronCore) accelerator for large ML workloads.",
        "Implemented tiling, streaming, and loop optimizations to maximize tensor engine utilization and reduce memory overhead.",
      ],
    },
    {
      Name: "Simple Cuda Renderer",
      Description: [
        "Basic GPU-accelerated renderer in CUDA to generate millions of circles with guarantees of atomicity and order correctness.",
        "Leveraged data-parallel GPU kernels to increase throughput by using a tile-based binning with prefix-sum memory compaction, contiguous memory access, warp-synchronous patterns, and balancing load with a work-queue system.",
      ],
    },
    {
      Name: "MNIST with Numpy",
      Link: "https://github.com/tnguyen2002/mnist_numpy",
      Description: [
        "An MNIST classifier built only with numpy and strictly no vibe coding ",
      ],
    },
    {
      Name: "Felix",
      Description: [
        "Felix is Rubik’s cube solver that uses built-in webcams to scan each face and returns a human-readable solution to the scramble.",
        "Leverages OpenCV for canny edge detection, CIEDE2000 color classification, and contour detection to reconstruct cube state",
      ],
      Link: "https://github.com/tnguyen2002/feliks", // Github
      Demo: "https://drive.google.com/file/d/1PxF8HhCKiHEwGDhYK_wz2IJOvZ7hBClJ/view?usp=drive_link", // Demo
      Report:
        "https://drive.google.com/file/d/1MHXvMp6agYfCFgQhjY0hVtAGmzVqRETS/view?usp=sharing", // Report
    },
    {
      Name: "Eyeris",
      Description: [
        "Eyeris is a mobile app that integrates GPT-4 and Whisper from OpenAI to provide descriptive textual captions and audio transcripts, to support visually impaired users in understanding their surroundings.",
        "Awarded outstanding project by Google sponsor at Stanford Software fair, competing against 70 other projects",
      ],
      Link: "https://github.com/tnguyen2002/Eyeris", // Github
      Demo: "https://www.linkedin.com/feed/update/urn:li:activity:7209814489251086336/", // Demo
    },
  ];

  return (
    <div className="projects-container">
      {fillerProjects.map((project, key) => (
        <div key={key} className="project-item">
          <div className="project-title">{project.Name}</div>
          <ul className="project-desc">
            {project.Description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
          <div className="project-links">
            {project.Link && (
              <a className="project-link" href={project.Link}>
                [Code]
              </a>
            )}
            {project.Demo && (
              <a className="project-link" href={project.Demo}>
                [Demo]
              </a>
            )}
            {project.Website && (
              <a className="project-link" href={project.Website}>
                [Website]
              </a>
            )}
            {project.Report && (
              <a className="project-link" href={project.Report}>
                [Report]
              </a>
            )}
            {project.Poster && (
              <a className="project-link" href={project.Poster}>
                [Poster]
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Projects;
