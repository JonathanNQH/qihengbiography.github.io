import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100 leading-tight">
          Welcome to a Journey of Life
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-sans">
          Delve into the profound narrative of a remarkable individual's existence.
        </p>
        <Link to="/biography">
          <Button className="px-10 py-5 text-lg font-semibold tracking-wide bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200">
            Explore Biography
          </Button>
        </Link>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;