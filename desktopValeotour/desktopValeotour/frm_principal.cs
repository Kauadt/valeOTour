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
    public partial class frm_principal : Form
    {
        public frm_principal()
        {
            InitializeComponent();
        }

        private void guiaToolStripMenuItem_Click(object sender, EventArgs e)
        {
            frm_verificacaoGuiaDadosGerais form = new frm_verificacaoGuiaDadosGerais();
            form.Show();
            this.Hide();
        }

        private void btn_sairPrincipal_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Deseja sair ?", "ValeOTour", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                Application.Exit();
            }
        }

        private void btn_sairPrincipal_Click_1(object sender, EventArgs e)
        {
            if (MessageBox.Show("Deseja sair ?", "ValeOTour", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                Application.Exit();
            }
        }

        private void locaisToolStripMenuItem_Click(object sender, EventArgs e)
        {
            frm_verificacaoLocalDadosGerais form = new frm_verificacaoLocalDadosGerais();
            form.Show();
            this.Hide();
        }
    }
}
