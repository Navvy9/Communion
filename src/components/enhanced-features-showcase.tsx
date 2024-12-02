import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Globe, MessageCircle, Users, Book, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: Users,
    title: "Community Groups",
    description: "Connect with like-minded individuals and explore diverse faith communities.",
  },
  {
    icon: MessageCircle,
    title: "Help And Support",
    description: "Embrace the opportunity to be a blessing to others.connect, and lend support, fostering a circle of warmth, care, and divine connection.",
  },
  {
    icon: Book,
    title: "Sacred Text Study",
    description: "Dive deep into various religious texts and expand your spiritual knowledge.",
  },
  {
    icon: Globe,
    title: "Virtual Tours",
    description: "Explore places of worship from around the world, right from your device.",
  },
  {
    icon: Calendar,
    title: "Interfaith Events",
    description: "Discover and participate in local and global interfaith gatherings and celebrations.",
  },
  {
    icon: Heart,
    title: "Community Service",
    description: "Make a positive impact through interfaith volunteer opportunities and projects.",
  },
];

export function EnhancedFeaturesShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const isUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleClick = (title: string) => {
    navigate(`/${title}`);
  };

  const handleJoinClick = () => {
    if (!isUserLoggedIn) {
      navigate("/AuthPage");
    } else {
      navigate("/community");
    }
  };

  const handleHoverStart = (index: number) => {
    setHoveredIndex(index);
    document.body.classList.add("bg-black");
  };

  const handleHoverEnd = () => {
    setHoveredIndex(null);
    document.body.classList.remove("bg-black");
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
          className="h-16 w-16 mx-auto text-indigo-600 mb-4"
        >
          <Globe className="h-full w-full" />
        </motion.div>
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-gray-800">
          Communion
        </h1>
        <p className="text-xl text-gray-500">Uniting Communities Across Faiths</p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 relative"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => handleHoverStart(index)}
            onHoverEnd={handleHoverEnd}
            className={`relative transition-opacity duration-300 ${
              hoveredIndex !== null && hoveredIndex !== index
                ? "opacity-50"
                : "opacity-100"
            }`}
          >
            <Card
              onClick={() => handleClick(feature.title)}
              className={`h-full shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-transform ${
                hoveredIndex === index ? "z-10 bg-gray-800 text-white" : ""
              }`}
            >
              <CardHeader className="flex items-center space-x-4">
                <feature.icon
                  className={`h-8 w-8 ${
                    hoveredIndex === index
                      ? "text-white"
                      : "text-indigo-600"
                  }`}
                />
                <div>
                  <CardTitle className="text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    height: hoveredIndex === index ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm">
                    Discover more about {feature.title.toLowerCase()} and how
                    it can enrich your spiritual journey.
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-16 text-center"
      >
        <Button
          size="lg"
          className="bg-indigo-600 text-white hover:bg-indigo-700 transition-all py-3 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={handleJoinClick}
        >
          Join Communion Today
        </Button>
        <p className="mt-4 text-sm text-gray-500">
          Start your journey of interfaith connection and understanding.
        </p>
      </motion.div>
    </div>
  );
}
