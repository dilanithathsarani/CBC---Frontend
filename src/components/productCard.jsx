import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/overview/${product.productId}`}
      className="w-[250px] m-4 h-[360px] rounded-2xl overflow-hidden bg-[#FFC0D3]
                 transition-transform transform hover:scale-105 
                 hover:shadow-[0_10px_20px_rgba(82,74,78,0.2)] border-2 border-[#FFC0D3]"
    >
      <div className="w-full h-[220px] overflow-hidden rounded-t-2xl">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="h-[140px] p-4 flex flex-col justify-between">
        <p className="text-sm text-[#524A4E]">{product.productId}</p>
        <p className="text-lg font-semibold text-[#524A4E] truncate">{product.name}</p>
        <p className="text-lg font-bold text-[#FF5C8D]">
          LKR.{product.price.toFixed(2)}{' '}
          {product.price < product.labeledPrice && (
            <span className="line-through text-sm text-[#FDEFF4] ml-2">
              LKR.{product.labeledPrice.toFixed(2)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}