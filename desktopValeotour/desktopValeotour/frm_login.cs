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
    public partial class frm_login : Form
    {
        public frm_login()
        {
            InitializeComponent();
        }

        private void btn_entrarLogin_Click(object sender, EventArgs e)
        {
            if (txt_emailLogin.Text == "admin" && txt_senhaLogin.Text == "admin")
            {
                frm_principal form = new frm_principal();
                form.Show();
                this.Hide();
            }
            else { MessageBox.Show("Usuário e Senha Invalidos", "Acesso", MessageBoxButtons.OK, MessageBoxIcon.Exclamation); }
        }

        private void btn_sairLogin_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Deseja sair ?", "ValeOTour", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                Application.Exit();
            }
        }
    }
}
