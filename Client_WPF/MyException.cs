using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Client_WPF
{
    public class MyException : Exception
    {
        public MyException() { }

        public MyException(string message) : base(message) { }


        public string Message
        {
            get { return base.Message;}
        }

    }
}
