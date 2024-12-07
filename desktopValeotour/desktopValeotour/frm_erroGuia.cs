using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace desktopValeotour
{
    public partial class frm_erroGuia : Form
    {
        public frm_erroGuia()
        {
            InitializeComponent();
        }

        guias g = new guias();

        private int _id;
        private int _idUsuario;
        private string _nome;
        private string _email;
        private int _cadastur;

        public frm_erroGuia(int id, int idUsuario, string nome, string email, int cadastur)
        {
            InitializeComponent();
            _id = id;
            _idUsuario = idUsuario;
            _nome = nome;
            _email = email;
            _cadastur = cadastur;
        }

        private void btn_enviarErroGuia_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Deseja negar a verificação do guia ?", "ValeOTour", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                try
                {
                    if (chk_nomeErroGuia.Checked)
                    {
                        g.setNome_v("Reprovado");
                    }
                    else
                    {
                        g.setNome_v("Aprovado");
                    }

                    if (chk_emailErroGuia.Checked)
                    {
                        g.setEmail_v("Reprovado");
                    }
                    else
                    {
                        g.setEmail_v("Aprovado");
                    }

                    if (chk_cpfErroGuia.Checked)
                    {
                        g.setCpf_v("Reprovado");
                    }
                    else
                    {
                        g.setCpf_v("Aprovado");
                    }

                    if (chk_fotoPerfilErroGuia.Checked)
                    {
                        g.setImagePath_v("Reprovado");
                    }
                    else
                    {
                        g.setImagePath_v("Aprovado");
                    }

                    if (chk_cadasturErroGuia.Checked)
                    {
                        g.setCadastur_v("Reprovado");
                    }
                    else
                    {
                        g.setCadastur_v("Aprovado");
                    }

                    if (chk_cidadeErroGuia.Checked)
                    {
                        g.setCidade_v("Reprovado");
                    }
                    else
                    {
                        g.setCidade_v("Aprovado");
                    }

                    if (chk_eixoTuristicoErroGuia.Checked)
                    {
                        g.setEixo_v("Reprovado");
                    }
                    else
                    {
                        g.setEixo_v("Aprovado");
                    }

                    if (chk_fotoCadasturFrenteErroGuia.Checked)
                    {
                        g.setCadastur_frente_v("Reprovado");
                    }
                    else
                    {
                        g.setCadastur_frente_v("Aprovado");
                    }

                    if (chk_fotoCadasturVersoErroGuia.Checked)
                    {
                        g.setCadastur_verso_v("Reprovado");
                    }
                    else
                    {
                        g.setCadastur_verso_v("Aprovado");
                    }

                    if (chk_biografiaErroGuia.Checked)
                    {
                        g.setBiografia_v("Reprovado");
                    }
                    else
                    {
                        g.setBiografia_v("Aprovado");
                    }

                    if (chk_taxaHoraErroGuia.Checked)
                    {
                        g.setTaxa_hora_v("Reprovado");
                    }
                    else
                    {
                        g.setTaxa_hora_v("Aprovado");
                    }

                    if (chk_taxaPessoaErroGuia.Checked)
                    {
                        g.setTaxa_pessoa_v("Reprovado");
                    }
                    else
                    {
                        g.setTaxa_pessoa_v("Aprovado");
                    }

                    g.setId_guia(_id);
                    g.setComentario_v(txt_comentarioErroGuia.Text);
                    g.setStatus_verificacao("Reprovado");
                    g.verificar_guia();

                }
                finally
                {
                    MessageBox.Show("Verificação negada com sucesso!");
                    frm_principal form = new frm_principal();
                    form.Show();
                    this.Hide();
                }
            }
        }

        private void btn_voltarErroGuia_Click(object sender, EventArgs e)
        {
            int id = _id;
            int idUsuario = _idUsuario;
            string nome = _nome;
            string email = _email;
            int cadastur = _cadastur;
            frm_verificacaoGuiaFotos form = new frm_verificacaoGuiaFotos(id, idUsuario, nome, email, cadastur);
            form.Show();
            this.Hide();
        }

        private void lbl_subErroGuia_Click(object sender, EventArgs e)
        {

        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }

        private void pic_erroGuia_Click(object sender, EventArgs e)
        {

        }
    }
}
