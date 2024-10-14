import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Globe, MessageCircle, Users, Book, Heart } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Navigate, useNavigate } from "react-router-dom"

const features = [
  {
    icon: Users,
    title: "Community Groups",
    description: "Connect with like-minded individuals and explore diverse faith communities.",
  },
  {
    icon: MessageCircle,
    title: "Interfaith Chat",
    description: "Engage in meaningful conversations and build bridges across different beliefs.",
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
]

export function EnhancedFeaturesShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const navigate = useNavigate();
  

  const handleClick = (title:string) => {
    navigate(`/${title}`)
  }

  
  return (
    <>
    <div className="container mx-auto px-4 py-16">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <Globe className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight mb-2">Communion</h1>
        <p className="text-xl text-muted-foreground">Uniting Communities Across Faiths</p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <Card onClick={() => handleClick(feature.title)} className="h-full">
              <CardHeader>
                <feature.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0, height: hoveredIndex === index ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-muted-foreground">
                    Discover more about {feature.title.toLowerCase()} and how it can enrich your spiritual journey.
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
        <Button size="lg" className="animate-pulse">
          Join Communion Today
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          Start your journey of interfaith connection and understanding.
        </p>
      </motion.div>
    </div>

    </>
  )
}