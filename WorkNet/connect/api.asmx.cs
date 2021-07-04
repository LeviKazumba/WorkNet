using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace WorkNet.connect
{
    /// <summary>
    /// Summary description for api
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class api : System.Web.Services.WebService
    {
        #region Global variables
        static readonly HttpClient client = new HttpClient();

        string SMTP = System.Configuration.ConfigurationManager.AppSettings["SMTP"].ToString();
        string SMTPPort = System.Configuration.ConfigurationManager.AppSettings["SMTPPort"].ToString();
        string SMTPUserName = System.Configuration.ConfigurationManager.AppSettings["SMTPUserName"].ToString();
        string SMTPPassword = System.Configuration.ConfigurationManager.AppSettings["SMTPPassword"].ToString();

        #endregion


        #region Landing Page
        [WebMethod(Description = "ContactUsEmail", EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] ContactUsEmail(string strData)
        {

            string strResult = "Success";
            string strContent = "";
            try
            {
                System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();
                Dictionary<string, object> MF = js.Deserialize<dynamic>(strData);

                //send email enquiry
                string EmailTo = "levi@maxicashapp.com";
                string Subject = MF["subject"].ToString();
                string Message = "Dear Admin, <br/><br/>" +
                                 "There is a new email for you, <br/><br/>" +
                                 "Name: " + MF["name"].ToString() +
                                 "<br/> Email: " + MF["email"].ToString() +
                                 "<br/> Message: " + MF["message"].ToString();

                SendEmail(EmailTo, Message, Subject);
            }
            catch (Exception ex)
            {
                strResult = "Failed";
                strContent = ex.Message;
            }

            return new string[] { strResult, strContent };

        }

        #endregion

        #region Registration
        [WebMethod(Description = "VerifyUser", EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] VerifyUser(string strData)
        {

            string Status = "";
            string Content = "";
            try
            {
                System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();
                Dictionary<string, object> MF = js.Deserialize<dynamic>(strData);


                Status = VerifyUser(MF["User"].ToString(), MF["VerifyBy"].ToString());
            }
            catch (Exception ex)
            {
                Status = "Failed";
                Content = ex.Message;
            }

            return new string[] { Status, Content };

        }

        //[WebMethod(Description = "VerifyEmail", EnableSession = true)]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string[] VerifyEmail(string strData)
        //{

        //    string Status = "";
        //    string Content = "";
        //    try
        //    {
        //        System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();
        //        Dictionary<string, object> MF = js.Deserialize<dynamic>(strData);

        //        //send email enquiry
        //        strResult = CheckEmail(MF["Email"].ToString());

        //    }
        //    catch (Exception ex)
        //    {
        //        Status = "Failed";
        //        Content = ex.Message;
        //    }

        //    return new string[] { Status, Content };

        //}
        #endregion

        #region Methods
        public void SendEmail(string EmailTo, string Message, string Subject)
        {

            //send email
            SmtpClient smtp = new SmtpClient(SMTP)
            {
                Host = SMTP,
                Port = int.Parse(SMTPPort),
                Credentials = new System.Net.NetworkCredential(SMTPUserName, SMTPPassword)
            };

            MailMessage mail = new MailMessage
            {
                From = new MailAddress(SMTPUserName, "WorkNet"),

            };

            mail.Subject = Subject;
            mail.To.Add(new MailAddress(EmailTo, Subject));
            mail.IsBodyHtml = true;
            mail.BodyEncoding = Encoding.UTF8;


            mail.Body = Message;

            mail.IsBodyHtml = true;

            smtp.Send(mail);


        }

        public string VerifyUser(string User, string VerifyBy)
        {
            string Status = "";

            WorkNetEntities db = new WorkNetEntities();

            try
            {
                if (VerifyBy == "Username")
                {
                    var Username = (from u in db.Users where u.Username == User select u).FirstOrDefault();
                    if (Username != null)
                    {
                        Status = "Taken";
                    }
                    else
                    {
                        Status = "Available";
                    }
                }

                if (VerifyBy == "Email")
                {
                    var Email = (from u in db.Users where u.Email == User select u).FirstOrDefault();
                    if (Email != null)
                    {
                        Status = "Taken";
                    }
                    else
                    {
                        Status = "Available";
                    }
                }

                if (VerifyBy == "Telephone")
                {
                    var phone = (from u in db.Users where u.Telephone == User select u).FirstOrDefault();
                    if (phone != null)
                    {
                        Status = "Taken";
                    }
                    else
                    {
                        Status = "Available";

                    }
                }

            }
            catch (Exception ex)
            {
                Status = "Error";

            }
            return Status;
        }

        #endregion

    }

}
