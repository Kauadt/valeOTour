using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace desktopValeotour
{
    public partial class frm_erroLocal : Form
    {
        public frm_erroLocal()
        {
            InitializeComponent();
        }

        locais l = new locais();

        private int _id;
        private string _nome;
        private string _email;

        private bool _acesso;
        private int _idFotos;
        private string _nomeFotos;
        private string _emailFotos;

        public frm_erroLocal(int id, string nome, string email)
        {
            InitializeComponent();
            _id = id;
            _nome = nome;
            _email = email;
        }

        public frm_erroLocal(bool acesso, string nomeFotos, string emailFotos, int idFotos)
        {
            InitializeComponent();
            _acesso = acesso;
            _idFotos = idFotos;
            _nomeFotos = nomeFotos;
            _emailFotos = emailFotos;
        }

        private void btn_voltarErroLocal_Click(object sender, EventArgs e)
        {
            int id = _id;
            string nome = _nome;
            string email = _email;

            int idFotos = _idFotos;
            string nomeFotos = _nomeFotos;
            string emailFotos = _emailFotos;

            if (_acesso != true)
            {
                frm_verificacaoLocalFotos form = new frm_verificacaoLocalFotos(id, nome, email);
                form.Show();
                this.Hide();
            }
            else
            {
                frm_verificacaoLocalFotos form = new frm_verificacaoLocalFotos(idFotos, nomeFotos, emailFotos);
                form.Show();
                this.Hide();
            }
        }

        private void btn_enviarErroLocal_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Deseja negar a verificação do guia ?", "ValeOTour", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                try
                {
                    if (chk_cidadeErroLocal.Checked)
                    {
                        l.setCidade_v("Reprovado");
                    }
                    else
                    {
                        l.setCidade_v("Aprovado");
                    }

                    if (chk_bairroErroLocal.Checked)
                    {
                        l.setBairro_v("Reprovado");
                    }
                    else
                    {
                        l.setBairro_v("Aprovado");
                    }

                    if (chk_ruaErroLocal.Checked)
                    {
                        l.setRua_v("Reprovado");
                    }
                    else
                    {
                        l.setRua_v("Aprovado");
                    }

                    if (chk_fotoPrincipalErroLocal.Checked)
                    {
                        l.setFoto_principal_v("Reprovado");
                    }
                    else
                    {
                        l.setFoto_principal_v("Aprovado");
                    }

                    if (chk_dificuldadeErroLocal.Checked)
                    {
                        l.setDificuldade_v("Reprovado");
                    }
                    else
                    {
                        l.setDificuldade_v("Aprovado");
                    }

                    if (chk_tempoEstimadoErroLocal.Checked)
                    {
                        l.setTempo_v("Reprovado");
                    }
                    else
                    {
                        l.setTempo_v("Aprovado");
                    }

                    if (chk_numeroErroLocal.Checked)
                    {
                        l.setNumero_v("Reprovado");
                    }
                    else
                    {
                        l.setNumero_v("Aprovado");
                    }

                    if (chk_nomeErroLocal.Checked)
                    {
                        l.setNome_v("Reprovado");
                    }
                    else
                    {
                        l.setNome_v("Aprovado");
                    }

                    if (chk_tipoErroLocal.Checked)
                    {
                        l.setTipo_v("Reprovado");
                    }
                    else
                    {
                        l.setTipo_v("Aprovado");
                    }

                    if (chk_descricaoErroLocal.Checked)
                    {
                        l.setDescricao_v("Reprovado");
                    }
                    else
                    {
                        l.setDescricao_v("Aprovado");
                    }

                    if (chk_horarioFuncionamentoErroLocal.Checked)
                    {
                        l.setHorario_v("Reprovado");
                    }
                    else
                    {
                        l.setHorario_v("Aprovado");
                    }

                    if (chk_distanciaErroLocal.Checked)
                    {
                        l.setDistancia_v("Reprovado");
                    }
                    else
                    {
                        l.setDistancia_v("Aprovado");
                    }

                    if (chk_emailErroLocal.Checked)
                    {
                        l.setEmail_v("Reprovado");
                    }
                    else
                    {
                        l.setEmail_v("Aprovado");
                    }

                    if (chk_eixoErroLocal.Checked)
                    {
                        l.setEixo_v("Reprovado");
                    }
                    else
                    {
                        l.setEixo_v("Aprovado");
                    }

                    if (chk_fotosSecundariasErroLocal.Checked)
                    {
                        l.setFotos_secundarias_v("Reprovado");
                    }
                    else
                    {
                        l.setFotos_secundarias_v("Aprovado");
                    }

                    if (chk_latitudeErroLocal.Checked)
                    {
                        l.setLatitude_v("Reprovado");
                    }
                    else
                    {
                        l.setLatitude_v("Aprovado");
                    }

                    if (chk_longitudeErroLocal.Checked)
                    {
                        l.setLongitude_v("Reprovado");
                    }
                    else
                    {
                        l.setLongitude_v("Aprovado");
                    }

                    l.setId_ponto_turistico(_id);
                    l.setComentario_v(txt_comentarioErroLocal.Text);
                    l.setStatus_verificacao_pt("Reprovado");
                    l.verificar_locais();

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
    }
}
