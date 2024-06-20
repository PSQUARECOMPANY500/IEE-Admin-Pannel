const fs = require("fs");
const path = require("path");

const crossIconPath = path.join(
process.cwd(),
"./public/MembershipInvoice/asset/crossIcon.png"
);
const logo = path.join(
process.cwd(),
"./public/MembershipInvoice/asset/Group-844.png"
);
const logo1 = path.join(
process.cwd(),
"./public/MembershipInvoice/asset/Group-879.png"
);
const Image13 = path.join(
process.cwd(),
"./public/MembershipInvoice/asset/Image 13@2x.png"
);
const logoMain = path.join(
process.cwd(),
"./public/MembershipInvoice/asset/logo.jpg"
);
const webIcon = path.join(
process.cwd(),
"./public/MembershipInvoice/asset/webIcon.png"
);
const phoneIcon = path.join(
process.cwd(),
"./public/MembershipInvoice/asset/phoneIcon.png"
);
const mailIcon = path.join(
process.cwd(),
"./public/MembershipInvoice/asset/mailIcon.png"
);

const imageConvertor = async (crossIconPath) => {
return new Promise((resolve, reject) => {
fs.readFile(crossIconPath, "base64", (err, data) => {
if (err) {
reject(err);
} else {
resolve(`data:image/png;base64,${data}`);
}
});
});
};

const pdfFormat = async (data) => {
return `

<body style="padding: 0; margin: 0; box-sizing: border-box; font-family: 'Poppins', heigth:1000px;">

    <div class="main" style="heigth:1000px; padding: 0rem 5rem; margin: 3rem; overflow: hidden; position: relative; border: 1px solid #e0dcdc;">
        <div class="topsvg" style="position: absolute; left: -3.97%; top: 0;">
            <img src=${await imageConvertor(logo)} alt="" style="height: 45vh;" />
        </div>
        <div class="bittomsvg" style="position: absolute; left: 77%; top:77.5%;">
            <img src=${await imageConvertor(logo1)} alt="" style="height: 45vh;">
        </div>
        <div class="centerpng" style="position: absolute; left: 50%; top:53%; transform: translate(-50%, -50%);">
            <img src=${await imageConvertor(Image13)} alt="" style="height: 90vh;">
        </div>


        <div class="header" style=" margin-top: 4rem; height: 27vh;">
            <div class="header-inner" style=" width: 30vw; height: 25vh; position: absolute; left:20%;">
                <div style="width: 100%; height:80px;">

                    <img class="IEEliftLogo" src=${await imageConvertor( logoMain )} alt=""
                        style="height: 65px; position: absolute; left:120%;">
                </div>


                <table>
                    <tbody>
                        <tr>
                            <td><img src=${await imageConvertor( webIcon )} alt="webIcon" class="icon"
                                    style="height: 20px; margin-left: 5px;"></td>
                            <td>
                                <p style="margin-left:7px; margin-top:5px;">www.ieelifts.com</p>
                            </td>

                            <td> <img src=${await imageConvertor( phoneIcon )} alt="phoneIcon" class="icon"
                                    style="height: 20px; margin-left: 5px;"></td>
                            <td>
                                <p style="margin-left:7px; margin-top:5px;">093566 13000</p>
                            </td>

                            <td> <img src=${await imageConvertor( mailIcon )} alt="mailIcon" class="icon"
                                    style="height: 20px; margin-left: 5px;"></td>
                            <td>
                                <p style="margin-left:7px; margin-top:5px;">info@ieelifts.com</p>
                            </td>
                        </tr>

                    </tbody>
                </table>

                <div class="company-address" style="text-align: center; margin-top: -1vw;">
                    <p>E 26, Phase 7, Industrial Area, Sector 73,<br> Sahibzada Ajit Singh Nagar,<br> Punjab 140308
                    </p>
                </div>

            </div>

        </div>

        <div class="precenter" style="margin-top: 2rem;  position: relative; width: 100%; height: 22vh;">

            <div class="left-precenter" style="line-height:0.7rem; position: absolute;">
                <h3>TO</h3>
                <p>Vivek singh</p>
                <p>Director Health Services Sector-35</p>
                <p>160059</p>
                <p>+91-7884512455</p>
            </div>

            <div class="right-precenter" style="line-height:0.7rem; position: absolute; right: 0;">
                <p><span style="font-weight: 600;">JON NO:</span> 24551</p>
                <p><span style="font-weight: 600;"> INVOICE NO:</span> 24551</p>
                <p><span style="font-weight: 600;">Date:</span> 25-04-2024</p>
            </div>

        </div>

        <div class="center">
            <div class="memebershipdetails" style="margin-top: 1rem;">
                <h1>Membership details</h1>

                <div class="memebershipdetails-inner">
                    <div>


                        <table>
                            <div
                                style="position: absolute; z-index: -1; width: 20vw; height:75px; background-color: #F8AC1D; clip-path: polygon(100% 0, 99% 55%, 100% 100%, 0% 100%, 0 57%, 0% 0%);">

                            </div>
                            <div>

                                <thead>

                                    <tr>
                                        <th style="padding: 20px 71.3px; ">Date</th>
                                        <th style="padding: 20px 71.3px;">Type</th>
                                        <th style="padding: 20px 71.3px;">Service Period</th>
                                        <th style="padding: 20px 71.3px;">Amount</th>
                                        <th style="padding: 20px 71.3px;">SGST</th>
                                        <th style="padding: 20px 71.3px;">CGST</th>
                                        <th style="padding: 20px 71.3px;">Discount</th>
                                        <th style="padding: 20px 71.3px;">Total</th>
                                    </tr>
                                </thead>
                            </div>


                            <tbody>
                                <tr>
                                    <td style="padding: 20px 60px;">11-06-2024</td>
                                    <td style="padding: 20px 60px;">Gold</td>
                                    <td style="padding: 20px 60px;">1 year</td>
                                    <td style="padding: 20px 60px;">Rs 42,000</td>
                                    <td style="padding: 20px 60px;">Rs 3,780</td>
                                    <td style="padding: 20px 60px;">Rs 3,780</td>
                                    <td style="padding: 20px 60px;">Rs 0</td>
                                    <td style="padding: 20px 60px;">Rs 0</td>
                                </tr>
                            </tbody>



                        </table>


                    </div>








                    <div class="banner3"
                        style="background-color: #F8AC1D; margin-top: 0.5rem; display: flex; align-items: center; justify-content: space-between; padding: 0px 3.5rem; clip-path: polygon(100% 0, 99% 55%, 100% 100%, 0% 100%, 0 57%, 0% 0%); color: #444444;">
                        <h4 style="font-weight: 700; font-size:18px;">Exclusive Benefits of Your Membership</h4>

                    </div>


                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div
                                        style="width: 20px; height: 20px; background-color: #F8AC1D; border-radius: 50%;">
                                    </div>
                                </td>
                                <td>
                                    <p style="margin-left:0.6rem;">LABOUR AND LUBRICATION</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div
                                        style="width: 20px; height: 20px; background-color: #F8AC1D; border-radius: 50%;">
                                    </div>
                                </td>
                                <td>
                                    <p style="margin-left:0.6rem;">MINOR PARTS COVERED</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div
                                        style="width: 20px; height: 20px; background-color: #F8AC1D; border-radius: 50%;">
                                    </div>
                                </td>
                                <td>
                                    <p style="margin-left:0.6rem;">6 SERVICE VISITS</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div
                                        style="width: 20px; height: 20px; background-color: #F8AC1D; border-radius: 50%;">
                                    </div>
                                </td>
                                <td>
                                    <p style="margin-left:0.6rem;">AI-BASED ANALYTICS</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div
                                        style="width: 20px; height: 20px; background-color: #F8AC1D; border-radius: 50%;">
                                    </div>
                                </td>
                                <td>
                                    <p style="margin-left:0.6rem;">MAJOR PARTS COVERED</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div
                                        style="width: 20px; height: 20px; background-color: #F8AC1D; border-radius: 50%;">
                                    </div>
                                </td>
                                <td>
                                    <p style="margin-left:0.6rem;">12 SERVICE VISITS</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div
                                        style="width: 20px; height: 20px; background-color: #F8AC1D; border-radius: 50%;">
                                    </div>
                                </td>
                                <td>
                                    <p style="margin-left:0.6rem;">6 TECHNICAL PREVENTIVE SAFETY ANALYSIS</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div
                                        style="width: 20px; height: 20px; background-color: #F8AC1D; border-radius: 50%;">
                                    </div>
                                </td>
                                <td>
                                    <p style="margin-left:0.6rem;">ANNUAL EQUIPMENT AUDIT </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div
                                        style="width: 20px; height: 20px; background-color: #F8AC1D; border-radius: 50%;">
                                    </div>
                                </td>
                                <td>
                                    <p style="margin-left:0.6rem;">ANNUAL SAFETY AUDIT</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>








                </div>
            </div>
        </div>


        <div class="thanksBox" style="width: 1200px; padding: 1.5rem 2rem;
            height: 218px; margin-left: 3.3rem; margin-top: 3rem; color: #444444; border: 1px solid #707070;
                border-radius: 5px;">
            <p style="margin-left: 10px;"> Thank You for Upgrading Your Membership.We extend our sincere gratitude
                for upgrading your membership with IEE. Your decision to elevate your membership
                level demonstrates your commitment to growth and excellence in the electrical industry.
                We are thrilled to offer you enhanced benefits and support tailored to your evolving needs.
                For any questions or further assistance, please do not hesitate to contact us</p>

            <h4 style="margin-left: 10px;">Prabhsimran Singh,<br> 9887654344,<br> info@ieelifts.com</h4>
        </div>
    </div>

</body>
`;
};

module.exports = pdfFormat;

//-----------------------------------------------------------------------------------------------------------------------------