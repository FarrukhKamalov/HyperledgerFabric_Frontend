import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // Modal holatini boshqarish

    // Form uchun state'lar
    const [id, setId] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [owner, setOwner] = useState("");
    const [appraisedValue, setAppraisedValue] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://192.168.0.148:5000/");
                console.log("API response:", response.data);
                if (response.data && response.data.data) {
                    setData(response.data.data);
                } else {
                    setError("Kutilmagan ma'lumot formati");
                }
            } catch (err) {
                console.error("API xatosi:", err);
                setError(err.message || "API ga ulanishda xatolik yuz berdi");
            }
        };

        fetchData();
    }, []);

    // Modal ochish va yopish uchun funksiya
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // Yangi asset qo‘shish uchun funksiya
    const handleAddAsset = async () => {
        const newAsset = {
            id,
            color,
            size, 
            owner,
            appraisedValue
        };

        try {
            const response = await axios.post("http://192.168.0.148:5000/assets", newAsset);
            console.log("Yangi asset qo‘shildi:", response.data);
            setData([...data, newAsset]); // Yangi assetni `data`ga qo‘shish
            toggleModal(); // Modalni yopish
        } catch (error) {
            console.error("Asset qo‘shishda xato:", error);
            setError("Yangi assetni qo‘shishda xato yuz berdi");
        }
    };

    if (error) {
        return <div>Xatolik: {error}</div>;
    }

    return (
        <div className="px-10 py-2">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <img
                        className="w-40"
                        src="https://cdn.prod.website-files.com/63c7842c42c0ed530e0e43b5/646778f8a3a0612ce271bf6f_Hyperledger-Fabric.png"
                        alt="logo"
                    />
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <button onClick={toggleModal} className="btn btn-info">Add asset</button> {/* Modalni ochish uchun */}
                        </li>
                    </ul>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>AppraisedValue</th>
                            <th>Color</th>
                            <th>ID</th>
                            <th>Owner</th>
                            <th>Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((v, i) => (
                            <tr key={v.ID || i}>
                                <th>{v.AppraisedValue}</th>
                                <td>{v.Color}</td>
                                <td>{v.ID}</td>
                                <td>{v.Owner}</td>
                                <td>{v.Size}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modalning JSX kodi */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                        <h2 className="text-xl font-bold mb-4">Add New Asset</h2>
                        
                        {/* Form elementlari */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">ID:</label>
                            <input
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Enter ID"
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Color:</label>
                            <input
                                type="text"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Enter Color"
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Size:</label>
                            <input
                                type="number"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Enter Size"
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Owner:</label>
                            <input
                                type="text"
                                value={owner}
                                onChange={(e) => setOwner(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Enter Owner"
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Appraised Value:</label>
                            <input
                                type="number"
                                value={appraisedValue}
                                onChange={(e) => setAppraisedValue(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Enter Appraised Value"
                            />
                        </div>

                        {/* Tugmalar */}
                        <div className="flex justify-end">
                            <button onClick={toggleModal} className="btn btn-error mr-2">Cancel</button>
                            <button onClick={handleAddAsset} className="btn btn-success">Add Asset</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
