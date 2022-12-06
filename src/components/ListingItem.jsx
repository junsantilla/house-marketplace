import { Link } from "react-router-dom";

function ListingItem({ listing, id, onEdit, onDelete }) {
	return (
		<li className="flex bg-white mb-4 border hover:bg-base-200">
			<Link
				to={`/category/${listing.type}/${id}`}
				className="categoryListingLink"
			>
				<img
					src={listing.imgUrls[0]}
					alt={listing.name}
					className=" w-60 object-cover h-40 "
				/>
				<div className="p-5 grow">
					<p className="text-sm">{listing.location}</p>
					<p className="font-bold text-lg">{listing.name}</p>

					<p className="categoryListingPrice">
						$
						{listing.offer
							? listing.discountedPrice
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
							: listing.regularPrice
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						{listing.type === "rent" && " / Month"}
					</p>
					<div className="flex">
						<p className="mr-5">
							{listing.bedrooms > 1
								? `${listing.bedrooms} Bedrooms`
								: "1 Bedroom"}
						</p>

						<p className="">
							{listing.bathrooms > 1
								? `${listing.bathrooms} Bathrooms`
								: "1 Bathroom"}
						</p>
					</div>
				</div>
			</Link>

			<div className="p-5 flex">
				{onEdit && (
					<button
						className="btn btn-xs mr-2"
						onClick={() => onEdit(id)}
					>
						Edit
					</button>
				)}

				{onDelete && (
					<button
						className="btn btn-xs"
						onClick={() => onDelete(listing.id, listing.name)}
					>
						Delete
					</button>
				)}
			</div>
		</li>
	);
}

export default ListingItem;
