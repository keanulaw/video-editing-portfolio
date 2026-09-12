export const projects = [
  {
    id: "1",
    title: "Serious Short",
    category: "Short Form",
    type: "drive",
    videoId: "1h3w_7NTVTj9UMzs94Cj7qAj4f61yzHk4",
    description: "Short-form content with a serious tone.",
  },
  {
    id: "2",
    title: "Comedy Short",
    category: "Short Form",
    type: "drive",
    videoId: "1ab_mV0eU5DUSAK9XUVfp-BBZtEgatxar",
    description: "Short-form content built around comedic moments.",
  },
  {
    id: "3",
    title: "Voice Over B-Roll",
    category: "Long Form",
    type: "drive",
    videoId: "1tfFOu3tqEaMO0Euchu6n-WXOT1fNfg2Q",
    description: "Voice-over narration paired with cinematic B-roll.",
  },
  {
    id: "4",
    title: "Talking Head Video",
    category: "Long Form",
    type: "youtube",
    videoId: "HeIcNepnqXY",
    description: "Long-form editing for an on-camera presentation.",
  },
  {
    id: "5",
    title: "Gaming Content",
    category: "Long Form",
    type: "youtube",
    videoId: "n-OAW9e92Sw",
    description: "Gaming footage, commentary, and a dynamic edit.",
  },
  {
    id: "6",
    title: "New Project 1",
    category: "Short Form",
    type: "drive",
    videoId: "14cdbqfqleEVvzklJszjq7cEJsYtHKTnv",
    description: "",
  },
  {
    id: "7",
    title: "New Project 2",
    category: "Long Form",
    type: "drive",
    videoId: "1V5FiJ0zjH20OIRpA7NmzqZRfeM7V0aMG",
    description: "",
  },
];
export const intro = {
  id: "intro",
  title: "Meet Shannon",
  category: "Video introduction",
  type: "drive",
  videoId: "1a-MQb3a0F5JhaVJtQ0q2bmD5Btu7cMWJ",
  description: "A personal introduction to my work and creative process.",
};
export const colorGrades = [
  {
    id: "8",
    title: "Capstone",
    category: "Color Grading",
    type: "drive",
    videoId: "1CziRZz_02HCG1vxHVxBe7F32PhrxrgNp",
    description: "Color grading by Shannon.",
  },
  {
    id: "9",
    title: "Class",
    category: "Color Grading",
    type: "drive",
    videoId: "1n26EaiNhUN-AZ2amPj88i6WcOtL20z9E",
    description: "Color grading by Shannon.",
  },
];
export const thumbnail = (project, width = 1000) =>
  project.type === "youtube"
    ? `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`
    : `https://lh3.googleusercontent.com/d/${project.videoId}=w${width}`;
export const videoLink = (project) =>
  project.type === "youtube"
    ? `https://www.youtube.com/watch?v=${project.videoId}`
    : `https://drive.google.com/file/d/${project.videoId}/view`;
export const skills = [
  ["DaVinci Resolve", "The editing desk.", "Editing"],
  ["Color Grading", "Finding the right tone.", "Color"],
  ["Motion Graphics", "Putting ideas in motion.", "Motion"],
  ["Sound Design", "Giving the cut its rhythm.", "Sound"],
  ["Video Compression", "Ready for the final delivery.", "Export"],
];
