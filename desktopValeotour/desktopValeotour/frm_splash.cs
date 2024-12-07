using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace desktopValeotour
{
    public partial class frm_splash : Form
    {
        public frm_splash()
        {
            InitializeComponent();
            Task.Run(() => AguardarEabrirForm());
        }

        private async Task AguardarEabrirForm()
        {
            await Task.Delay(5000);
            this.Invoke((MethodInvoker)delegate {
                frm_login form = new frm_login();
                form.Show();
                this.Hide();
            });
        }
    }
}
