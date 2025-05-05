
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface SearchResult {
  id: string;
  title: string;
}

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm.trim().length > 2) {
        performSearch();
        setShowResults(true);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const performSearch = async () => {
    try {
      setIsSearching(true);
      const { data, error } = await supabase
        .from("products")
        .select("id, title")
        .ilike("title", `%${searchTerm}%`)
        .limit(5);

      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultClick = (id: string) => {
    navigate(`/product/${id}`);
    setSearchTerm("");
    setShowResults(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowResults(false);
    }
  };

  return (
    <div className="relative w-full lg:w-96">
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm.trim().length > 2 && setShowResults(true)}
            onBlur={() => 
              // Delay hiding results to allow clicking on them
              setTimeout(() => setShowResults(false), 200)
            }
          />
        </div>
      </form>

      {showResults && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li 
                  key={result.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onMouseDown={() => handleResultClick(result.id)}
                >
                  {result.title}
                </li>
              ))}
              <li 
                className="px-4 py-2 text-[#800000] hover:bg-gray-100 cursor-pointer text-center font-medium"
                onMouseDown={handleSearchSubmit}
              >
                View all results for "{searchTerm}"
              </li>
            </ul>
          ) : searchTerm.trim().length > 2 ? (
            <div className="p-4 text-center text-gray-500">No results found</div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
