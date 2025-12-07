import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/overview/${product.productId}`}
      className="w-[250px] m-4 h-[360px] rounded-2xl overflow-hidden bg-[#F7CAC9]
                 transition-transform transform hover:scale-105 
                 hover:shadow-[0_10px_20px_rgba(220,20,60,0.4)] border-2 border-[#F7CAC9]"
    >
      <div className="w-full h-[220px] overflow-hidden rounded-t-2xl">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="h-[140px] p-4 flex flex-col justify-between">
        <p className="text-sm text-[#F75270]">{product.productId}</p>
        <p className="text-lg font-semibold text-[#DC143C] truncate">{product.name}</p>
        <p className="text-lg font-bold text-[#DC143C]">
          LKR.{product.price.toFixed(2)}{" "}
          {product.price < product.labeledPrice && (
            <span className="line-through text-sm text-[#F75270] ml-2">
              LKR.{product.labeledPrice.toFixed(2)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
