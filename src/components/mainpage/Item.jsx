const Item = ({name, description, location, likes, image, isFavorite}) => {
    return <div className="bg-gray-200 p-5 px-10 rounded-xl mb-5 shadow-xl grid grid-cols-2">
        <div>
            <div>
                <p className="font-bold text-400">{name}</p>
            </div>
            <div>
                <p>{description}</p>
            </div>
            <div>
                <p>{location}</p>
            </div>
            <div>
                {likes}
            </div>
        </div>
        <div>
            <p>{image}</p>
        </div>
    </div>
}

export default Item;