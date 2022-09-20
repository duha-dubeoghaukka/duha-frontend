import placeNames from "../../utils/placeNames.js";
import PlaceButton from "../../components/mainpage/PlaceButton";

const Places = () => {
    return <div>
        <div>
            <ul className="flex flex-row justify-around">
                <li className="font-bold text-2xl">관광</li>
                <li className="font-bold text-2xl">맛집</li>
                <li className="font-bold text-2xl">숙소</li>
            </ul>
        </div>
        <div>
            <ul className="flex flex-row justify-between">
                <li className="bg-green-400 p-1.5 px-3 rounded text-white font-bold shadow-2xl">전체</li>
                {placeNames.map(place => {
                    return <PlaceButton key={place.name} {...place}/>;
                })
                }
            </ul>
        </div>
    </div>
}

export default Places;