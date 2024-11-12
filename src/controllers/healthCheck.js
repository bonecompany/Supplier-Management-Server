import ApiResponse from "../utils/ApiResponse.js";
import  async_handler  from "../utils/asyncHandler.js";
import { createPdf } from "../services/billingPdf.js";

const healthcheck = async_handler(async (req, res) => {
    
    return res.status(200).
        json(new ApiResponse(200, " ok ", 'passed'))
})
export default healthcheck;

export const apiTest = async_handler(async (req, res, next) => {

    const jsonData = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Anytown'
      }
    };
  
    const pdfMiddleware = createPdf(jsonData);
  
    pdfMiddleware(req, res, next);
  });

