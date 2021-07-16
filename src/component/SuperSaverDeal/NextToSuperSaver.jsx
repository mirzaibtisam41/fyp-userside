import React from 'react';
import "./Deal.css";
import { ServerPort } from "../../Api/apiActions";

const NextToSuperSaver = ({ adds }) => {
    const filterAdds = adds && adds.slice(0, 3);

    return <React.Fragment>
        <div className="nextSavercontainer w-100">
            {
                filterAdds && filterAdds.map((item, index) => {
                    return <div key={index} className="next-images">
                        <img src={`${ServerPort}${item.Add}`} alt="" />
                    </div>
                })
            }
        </div>
    </React.Fragment>
}

export default NextToSuperSaver;
