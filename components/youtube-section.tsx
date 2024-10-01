import Button from "./ds/button";

type YoutubeSectionProps = {
  className?: string;
  videoUrl: string;
};

export default function YoutubeSection({
  className,
  videoUrl,
}: YoutubeSectionProps) {
  return (
    <div className={`${className} relative bg-black`}>
      <iframe
        className="absolute left-0 top-0 h-full w-full border-0"
        src={videoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video"
      ></iframe>
    </div>
  );
}
