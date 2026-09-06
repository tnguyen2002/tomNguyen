import type { Project } from "./types";
// Every project has a demo now, so `image` and `pending` are unused here —
// both still exist in lib/media for the next project that needs them.
import { video } from "../lib/media";

/**
 * TODO(tom): the `summary` and `stack` fields below are drafted from your
 * existing bullet points — rewrite them in your own voice.
 *
 * `year` is set from each project's GitHub repo creation date, except for
 * pathology-wsi (2022), cuda-renderer (2024) and trainium-conv (2024), which
 * are Tom's own dates. Every project has one now;
 * a project without one simply renders no date rather than a guess.
 *
 * To attach a demo, swap `visual` for:  video("<slug>", "<alt text>")
 * The slug must match public/media/<slug>.mp4 — see README.md.
 *
 * Every demo is a Manim animation rather than a screen recording, because those
 * projects cannot usefully be captured here: no NVIDIA GPU, no Trainium
 * device, no medical dataset, and post2vid
 * takes 5-15 minutes per run, so a real capture would be a progress log. They
 * illustrate the actual algorithm rather than pretending to be a capture of it.
 *
 * Each is ~7s and loops while on screen, and each shows the WHOLE process
 * rather than one highlight. Seven seconds still cannot walk a pipeline stage
 * by stage, so the trick is spatial instead of sequential: the entire diagram
 * is laid out at once and revealed fast, and the finished picture is what the
 * loop leaves you holding. The caption under the title is static for the same
 * reason — one that changed would be unreadable at this pace.
 *
 * Sources live in scripts/manim/, one file per demo plus house.py for the
 * shared palette and helpers. gandalf-md is the one built on real imagery: its
 * pipeline is the report's own Figure 7, redrawn legibly and populated with the
 * poster's images, which gandalf_md_assets.py regenerates from the poster PDF.
 *
 * Felix is the other one built on real imagery: its first plate is an actual
 * frame of the detector running, kept at scripts/manim/felix_source.jpg because
 * public/media is untracked and the demo's own poster would have overwritten
 * the only copy. felix_assets.py crops it.
 */
export const projects: Project[] = [
  {
    slug: "post2vid",
    name: "Post2Vid",
    summary:
      "an x account that turns any paper, article, or technical question into a narrated animated video",
    description: [
      "Built with Yahli Hazan for the 2026 SpaceXAI hackathon, where it finished top 6.",
      "Quote-tweet any paper, article, or technical question at @Post2Vid and it replies with an animated explainer video.",
      "A poller classifies the source, and a render worker storyboards it with Grok, generates Manim scenes, and narrates them with xAI text-to-speech.",
      "Quality loops statically validate generated scene code, repair render failures, and review frames by vision before publishing.",
    ],
    stack: ["manim", "python", "node", "supabase", "grok", "ffmpeg"],
    year: "2026",
    links: [
      { label: "x account", href: "https://x.com/post2vid" },
      { label: "code", href: "https://github.com/tnguyen2002/post2vid" },
      {
        label: "post",
        href: "https://x.com/t0m_win/status/2086281753854140825",
      },
    ],
    visual: video(
      "post2vid",
      "the whole path from a mention: poller, queue and worker along the top, then source, storyboard, narration and video back along the bottom, and the reply closing the loop"
    ),
  },
  {
    slug: "distilled-gg",
    name: "distilled.gg",
    summary:
      "drop an overwatch 2 vod, get back a clip of every kill you got, cut to the frame",
    description: [
      "Upload up to ten Overwatch 2 VODs and get back a clip of every kill you got.",
      "Fine-tuned YOLOv8s to detect killfeed rows from frames sampled every two seconds, cropped to the top-right band for speed.",
      "Attributed kills with OCR on the attacker name, cross-frame voting, roster-based correction, and a vision-model fallback for low-confidence reads.",
      "Built and published the first public Overwatch killfeed dataset (453 images, 626 boxes) using a heuristic box proposer to speed up annotation.",
    ],
    stack: ["yolov8", "python", "next.js", "modal", "ffmpeg", "ocr"],
    year: "2026",
    biteSized: true,
    links: [
      { label: "website", href: "https://distilled.gg" },
      { label: "code", href: "https://github.com/tnguyen2002/distilled.gg" },
      {
        label: "dataset",
        href: "https://huggingface.co/datasets/tnguyen2002/overwatch2-killfeed-rows",
      },
      {
        label: "model",
        href: "https://huggingface.co/tnguyen2002/overwatch2-killfeed-detector",
      },
    ],
    visual: video(
      "distilled-gg",
      "the whole pipeline: a vod sampled every two seconds, killfeed rows detected, the attacker strip read, three disagreeing reads voted into one name, and clips cut"
    ),
  },
  {
    slug: "blinkybird",
    name: "BlinkyBird",
    summary:
      "flappy bird you play by blinking — mediapipe reads your eyes through the webcam",
    description: [
      "A Flappy Bird clone controlled entirely by blinking: MediaPipe Face Mesh tracks the eye landmarks each frame and the eye aspect ratio decides when the bird flaps.",
      "Calibrates per player before the round — three passes of open-eye baseline and deliberate blinks set the threshold — with a cooldown so one blink is one flap, and a picture-in-picture camera preview while you play.",
    ],
    stack: ["python", "mediapipe", "opencv", "pygame"],
    year: "2026",
    biteSized: true,
    // TODO(tom): the repo is private, so no [code] link — a 404 is worse than
    // no link. Make tnguyen2002/blinkybird public and this becomes:
    //   { label: "code", href: "https://github.com/tnguyen2002/blinkybird" }
    links: [],
    visual: video(
      "blinkybird",
      "six mediapipe landmarks per eye, the eye aspect ratio collapsing through a per-player threshold, and that crossing flapping the bird"
    ),
  },
  {
    slug: "gandalf-md",
    name: "GANDALF-MD",
    summary:
      "gan training that learns its own augmentations for scarce medical imaging data",
    description: [
      "Trained StyleGAN2 on small medical imaging datasets using learned augmentations instead of hand-picked ones, with Xiluo He.",
      "Replaced DiffAugment's fixed color/translation/cutout chain with a Viewmaker network trained on the same data, so the augmentation applied to reals and fakes is learned rather than chosen by hand.",
      "Showed the synthetic images help downstream: a SimCLR + ResNet-18 classifier trained on reals plus generated images raised retinal accuracy from 0.33 to 0.58.",
    ],
    stack: ["pytorch", "gans", "diffaugment", "viewmaker", "simclr"],
    year: "2023",
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
    visual: video(
      "gandalf-md",
      "the pipeline from the report's figure 7, drawn with its own images — a real lesion plus the viewmaker's perturbation makes a view, the same transform hits reals and fakes inside diffaugment, and the generated samples come out at fid 86.0"
    ),
  },
  {
    slug: "pathology-wsi",
    name: "Pathology WSI Embeddings via Multimodal Language Guided Self-Supervision",
    summary:
      "language-guided self-supervised embeddings for whole-slide pathology images",
    description: [
      "Used unstructured pathology reports as the supervisory signal for learning whole-slide image embeddings, with Ekin Tiu.",
      "Built a CLIP-style contrastive pretraining pipeline over 1,401 TCGA slide and report pairs, with a token-guided co-attention module that lets a text query produce a slide-level attention heatmap.",
      "In-domain pretraining lifted linear-probe AUROC on 5-way disease classification from 0.79 (CLIP weights) to 0.82 on a held-out set of 561 slides, and enabled zero-shot classification from text queries.",
    ],
    stack: ["pytorch", "clip", "self-supervised", "co-attention"],
    year: "2022",
    links: [
      { label: "code", href: "https://github.com/tnguyen2002/PathZero" },
      {
        label: "report",
        href: "https://drive.google.com/file/d/1BeTmYFweS2vkuqx6WO9v8A-LgwELywBe/view?usp=drive_link",
      },
      {
        label: "poster",
        href: "https://drive.google.com/file/d/1WZ8pqc72-EwrebfYIxAU02sDzleQGo3p/view?usp=drive_link",
      },
    ],
    visual: video(
      "pathology-wsi",
      "a slide cut into 20,000 patches, aligned against the report text by clip, then pooled by co-attention into a single slide embedding"
    ),
  },
  {
    slug: "trainium-conv",
    name: "AWS Trainium Convolutions",
    summary:
      "a fused convolution + max-pool kernel for the aws trainium accelerator",
    description: [
      "Built with Stanley Yang.",
      "Wrote a fused convolution + max-pool kernel for the AWS Trainium NeuronCore in NKI.",
      "Expressed each filter tap as a 128×128 matmul on the tensor engine, accumulating all taps for an output row in PSUM before touching SBUF.",
      "Loaded and pre-transposed the weights into SBUF once, tiled the input into row bands so each band is read a single time, and applied bias and 2×2 max-pool on chip so the output is written to HBM exactly once.",
      "Passes the course harness at 256 input and output channels in both fp32 and fp16, with and without pooling.",
    ],
    year: "2024",
    links: [
      { label: "code", href: "https://github.com/tnguyen2002/trainium-convolutions" },
    ],
    visual: video(
      "trainium-conv",
      "memory, on-chip buffer and memory side by side: the filter and a band of input rows loaded on chip once, each filter tap firing a matmul that accumulates, then bias and max-pool applied on chip before the output is written back once"
    ),
  },
  {
    slug: "cuda-renderer",
    name: "Simple CUDA Renderer",
    summary:
      "a gpu renderer that holds two million overlapping circles in draw order",
    description: [
      "Built with Stanley Yang.",
      "A CUDA renderer for scenes of up to 2 million semi-transparent circles, over 30x faster than the sequential CPU renderer on 100k-circle scenes.",
      "Parallelized over screen tiles instead of circles: a 32×32 grid with one 256-thread block per tile, so every pixel has a single writer and the hot path has no atomics or locks.",
      "Each block streams circles in batches of 256, tests one per thread against its tile, and runs a shared-memory exclusive scan to pack the hits into a list that stays in draw order, removing the need for a sort.",
      "The same threads then blend that list into the tile's pixels, one pixel per thread, accumulating color in a register so each pixel is read and written once per batch.",
    ],
    stack: ["cuda", "c++", "parallel algorithms", "prefix sum", "shared memory"],
    year: "2024",
    links: [{ label: "code", href: "https://github.com/tnguyen2002/cuda-renderer" }],
    visual: video(
      "cuda-renderer",
      "a field of translucent circles under a tile grid with one tile highlighted, then a batch of circles checked against that tile: which ones touch it, a running count, the matches packed together still in draw order, and those blended into the tile's pixels"
    ),
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
    year: "2025",
    links: [
      { label: "code", href: "https://github.com/tnguyen2002/feliks" },
      {
        label: "demo",
        href: "https://drive.google.com/file/d/1PxF8HhCKiHEwGDhYK_wz2IJOvZ7hBClJ/view?usp=drive_link",
      },
      {
        label: "report",
        href: "https://drive.google.com/file/d/1MHXvMp6agYfCFgQhjY0hVtAGmzVqRETS/view?usp=sharing",
      },
    ],
    visual: video(
      "felix",
      "the real capture of felix outlining facelets, one sampled rgb matched by ciede2000 to the nearest cube colour, the face rebuilt from those, and the solution that falls out"
    ),
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
    year: "2025",
    biteSized: true,
    links: [{ label: "code", href: "https://github.com/tnguyen2002/mnist_numpy" }],
    visual: video(
      "mnist-numpy",
      "a digit flattened to 784 numbers, through relu and softmax to a prediction, and the gradient running back the other way"
    ),
  },
];
