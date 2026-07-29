import type { Project } from "./types";
import { pending, noVisual } from "../lib/media";

/**
 * TODO(tom): the `summary` and `stack` fields below are drafted from your
 * existing bullet points — rewrite them in your own voice. `year` is left off
 * every project deliberately (I don't know them); rows render just the index
 * until you fill them in.
 *
 * To attach a demo, swap `visual` for:  video("<slug>", "<alt text>")
 * The slug must match public/media/<slug>.mp4 — see README.md.
 */
export const projects: Project[] = [
  {
    slug: "gandalf-md",
    name: "GANDALF-MD",
    summary:
      "gan training that learns its own augmentations for scarce medical imaging data",
    description: [
      "Developed a GAN training method for medical imagery that integrates learned augmentations from Viewmaker Networks with DiffAugment’s differentiable augmentation framework.",
      "Improved image quality for multiple medical imaging modalities: skin lesions, pathology tissue slides, and retinal fundus images",
    ],
    stack: ["pytorch", "gans", "diffaugment", "medical imaging"],
    links: [
      { label: "code", href: "https://github.com/tnguyen2002/GANDALF-MD" },
      {
        label: "report",
        href: "https://drive.google.com/file/d/1GceUlrLSWwjQF4A8ZsDxrUjCclLImul6/view",
      },
      {
        label: "poster",
        href: "https://drive.google.com/file/d/1pJD2CZyGIRjJHr-gOd51RXHqrIPGzzMn/view",
      },
    ],
    visual: pending,
  },
  {
    slug: "pathology-wsi",
    name: "Pathology WSI Embeddings via Multimodal Language Guided Self-Supervision",
    summary:
      "language-guided self-supervised embeddings for whole-slide pathology images",
    description: [
      "Self-supervised interpretable pathology whole slide image embeddings using OpenAI’s CLIP contrastive learning framework and a patched based co-attention mechanism, using over 20,000+ patch images",
    ],
    stack: ["pytorch", "clip", "self-supervised", "co-attention"],
    links: [
      {
        label: "report",
        href: "https://drive.google.com/file/d/1MHXvMp6agYfCFgQhjY0hVtAGmzVqRETS/view?usp=sharing",
      },
    ],
    visual: pending,
  },
  {
    slug: "trainium-conv",
    name: "AWS Trainium Convolutions",
    summary:
      "a fused convolution + max-pool kernel for the aws trainium accelerator",
    description: [
      "Developed a fused convolution + max-pool kernel on the AWS Trainium (NeuronCore) accelerator for large ML workloads.",
      "Implemented tiling, streaming, and loop optimizations to maximize tensor engine utilization and reduce memory overhead.",
    ],
    stack: ["trainium", "neuronx", "kernel optimization", "tiling"],
    links: [],
    visual: noVisual,
  },
  {
    slug: "cuda-renderer",
    name: "Simple CUDA Renderer",
    summary:
      "a gpu circle renderer with atomicity and ordering guarantees at millions of primitives",
    description: [
      "Basic GPU-accelerated renderer in CUDA to generate millions of circles with guarantees of atomicity and order correctness.",
      "Leveraged data-parallel GPU kernels to increase throughput by using a tile-based binning with prefix-sum memory compaction, contiguous memory access, warp-synchronous patterns, and balancing load with a work-queue system.",
    ],
    stack: ["cuda", "c++", "parallel algorithms", "prefix sum"],
    links: [],
    visual: noVisual,
  },
  {
    slug: "mnist-numpy",
    name: "MNIST with Numpy",
    summary:
      "an mnist classifier from scratch in numpy — backprop by hand, no frameworks",
    description: [
      "An MNIST classifier built only with numpy and strictly no vibe coding",
    ],
    stack: ["numpy", "python", "backpropagation"],
    links: [{ label: "code", href: "https://github.com/tnguyen2002/mnist_numpy" }],
    visual: pending,
  },
  {
    slug: "felix",
    name: "Felix",
    summary:
      "a rubik's cube solver that reads the cube through your webcam and hands back a solution",
    description: [
      "Felix is Rubik’s cube solver that uses built-in webcams to scan each face and returns a human-readable solution to the scramble.",
      "Leverages OpenCV for canny edge detection, CIEDE2000 color classification, and contour detection to reconstruct cube state",
    ],
    stack: ["opencv", "python", "computer vision", "ciede2000"],
    // TODO(tom): the old [report] link here was a byte-for-byte copy of the
    // pathology project's Drive URL, so it's dropped rather than guessed at.
    // Add { label: "report", href: "..." } back if there's a real one.
    links: [
      { label: "code", href: "https://github.com/tnguyen2002/feliks" },
      {
        label: "demo",
        href: "https://drive.google.com/file/d/1PxF8HhCKiHEwGDhYK_wz2IJOvZ7hBClJ/view?usp=drive_link",
      },
    ],
    visual: pending,
  },
  {
    slug: "eyeris",
    name: "Eyeris",
    summary:
      "a mobile app that narrates the world for visually impaired users, with gpt-4 and whisper",
    description: [
      "Eyeris is a mobile app that integrates GPT-4 and Whisper from OpenAI to provide descriptive textual captions and audio transcripts, to support visually impaired users in understanding their surroundings.",
      "Awarded outstanding project by Google sponsor at Stanford Software fair, competing against 70 other projects",
    ],
    stack: ["react native", "gpt-4", "whisper", "accessibility"],
    links: [
      { label: "code", href: "https://github.com/tnguyen2002/Eyeris" },
      {
        label: "demo",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7209814489251086336/",
      },
    ],
    visual: pending,
  },
];
