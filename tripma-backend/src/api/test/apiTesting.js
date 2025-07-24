import getAccessToken from "../lufthunsa/getAccessTocken.js";


const ApiTesting = async (req, res) => {
    try {
        res.send('Server is running');


    } catch (e) {
        console.log(e.message);
        return res.status(500).json({ "message": e.message })
    }
}

export default ApiTesting