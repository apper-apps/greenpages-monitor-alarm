import { useState, useEffect } from "react";
import StrainCard from "@/components/molecules/StrainCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { getAllStrains } from "@/services/api/strainService";
import { useNavigate } from "react-router-dom";

const StrainGrid = ({ filters = {} }) => {
  const [strains, setStrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadStrains = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllStrains();
      
      let filteredStrains = data;

      // Apply filters
      if (filters.category && filters.category !== "all") {
        filteredStrains = filteredStrains.filter(strain => 
          strain.category?.toLowerCase() === filters.category.toLowerCase()
        );
      }

      if (filters.term) {
        filteredStrains = filteredStrains.filter(strain =>
          strain.name.toLowerCase().includes(filters.term.toLowerCase()) ||
          strain.description.toLowerCase().includes(filters.term.toLowerCase())
        );
      }

      if (filters.priceRange) {
        const [min, max] = filters.priceRange.includes("+") 
          ? [parseInt(filters.priceRange.replace("+", "")), Infinity]
          : filters.priceRange.split("-").map(p => parseInt(p));
        
        filteredStrains = filteredStrains.filter(strain => {
          const price = parseFloat(strain.price);
          return price >= min && (max === Infinity || price <= max);
        });
      }

      setStrains(filteredStrains);
    } catch (err) {
      setError("Failed to load strains. Please try again.");
      console.error("Error loading strains:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStrains();
  }, [filters]);

  const handleStrainClick = (strain) => {
    navigate(`/strain/${strain.Id}`);
  };

  if (loading) {
    return <Loading variant="grid" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadStrains} />;
  }

  if (strains.length === 0) {
    const hasFilters = filters.category || filters.term || filters.priceRange;
    return (
      <Empty
        icon="Search"
        title={hasFilters ? "No strains match your filters" : "No strains available"}
        description={hasFilters 
          ? "Try adjusting your filters or search terms to find more results."
          : "Be the first to list a strain on our marketplace!"
        }
        action={!hasFilters ? {
          label: "List Your Strain",
          icon: "Plus",
          onClick: () => navigate("/dashboard")
        } : null}
      />
    );
  }

  return (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {strains.map((strain) => (
        <StrainCard
          key={strain.Id}
          strain={strain}
          onClick={() => handleStrainClick(strain)}
        />
      ))}
    </div>
  );
};

export default StrainGrid;