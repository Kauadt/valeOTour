using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MySql.Data;
using MySql.Data.MySqlClient;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace desktopValeotour
{
    public partial class frm_verificacaoLocalAdicionais : Form
    {
        public frm_verificacaoLocalAdicionais()
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

        public frm_verificacaoLocalAdicionais(int id, string nome, string email)
        {
            InitializeComponent();
            _id = id;
            _nome = nome;
            _email = email;
        }

        public frm_verificacaoLocalAdicionais(bool acesso, int idFotos, string nomeFotos, string emailFotos)
        {
            InitializeComponent();
            _acesso = acesso;
            _idFotos = idFotos;
            _nomeFotos = nomeFotos;
            _emailFotos = emailFotos;
        }

        private void btn_sairAdicionaisVerificacaoLocal_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Deseja sair ?", "ValeOTour", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                Application.Exit();
            }
        }

        private void frm_verificacaoLocalAdicionais_Load_1(object sender, EventArgs e)
        {
            if (_acesso == true)
            {
                l.setId_ponto_turistico(_idFotos);

                //panel
                txt_nomePanelVerificacaoLocal.Text = _nomeFotos;
                txt_emailPanelVerificacaoLocal.Text = _emailFotos;

                MySqlConnection _conn = null;
                string _strConn = @"Server=localhost;Database=valeotour;Uid=root;Pwd='';Connect Timeout=30;";
                _conn = new MySqlConnection(_strConn);
                _conn.Open();
                string _mSQL = "select * from pontos_turisticos where id_ponto_turistico = '" + _idFotos + "'";
                MySqlCommand _cmd = new MySqlCommand(_mSQL, _conn);
                MySqlDataAdapter _da = new MySqlDataAdapter(_cmd);
                DataTable _dt = new DataTable();
                _da.Fill(_dt);
                string _image = _dt.Rows[0]["foto_principal_pt"].ToString();
                pic_imagemPerfil.ImageLocation = "C:/xampp/htdocs/valeOTour/pontos_turisticos/assets/" + _image;
                pic_imagemPerfil.SizeMode = PictureBoxSizeMode.Zoom;


                dataGridViewVerificacoesAdicionaisVerificacaoLocal.DataSource = l.consultar_locaisVerificacoesPontosTuristicos();
                dataGridViewHorariosAdicionaisVerificacaoLocal.DataSource = l.consultar_locaisHorarioFuncionamento();
                dataGridViewTrilhasAdicionaisVerificacaoLocal.DataSource = l.consultar_locaisTrilhas();
                
                exibirVerificacoesPontosTuristicos(dataGridViewVerificacoesAdicionaisVerificacaoLocal.CurrentRow.Index);
                exibirHorarioFuncionamentoAbertura(dataGridViewHorariosAdicionaisVerificacaoLocal.CurrentRow.Index);
                exibirHorarioFuncionamentoFechamento(dataGridViewHorariosAdicionaisVerificacaoLocal.CurrentRow.Index);
                if (dataGridViewTrilhasAdicionaisVerificacaoLocal.CurrentRow != null)
                {
                    exibirTrilhas(dataGridViewTrilhasAdicionaisVerificacaoLocal.CurrentRow.Index);
                }
            }
            else
            {
                l.setId_ponto_turistico(_id);

                //panel
                txt_nomePanelVerificacaoLocal.Text = _nome;
                txt_emailPanelVerificacaoLocal.Text = _email;

                MySqlConnection conn = null;
                string strConn = @"Server=localhost;Database=valeotour;Uid=root;Pwd='';Connect Timeout=30;";
                conn = new MySqlConnection(strConn);
                conn.Open();
                string mSQL = "select * from pontos_turisticos where id_ponto_turistico = '" + _id + "'";
                MySqlCommand cmd = new MySqlCommand(mSQL, conn);
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                string image = dt.Rows[0]["foto_principal_pt"].ToString();
                pic_imagemPerfil.ImageLocation = "C:/xampp/htdocs/valeOTour/pontos_turisticos/assets/" + image;
                pic_imagemPerfil.SizeMode = PictureBoxSizeMode.Zoom;

                dataGridViewVerificacoesAdicionaisVerificacaoLocal.DataSource = l.consultar_locaisVerificacoesPontosTuristicos();
                dataGridViewHorariosAdicionaisVerificacaoLocal.DataSource = l.consultar_locaisHorarioFuncionamento();
                dataGridViewTrilhasAdicionaisVerificacaoLocal.DataSource = l.consultar_locaisTrilhas();
                
                exibirVerificacoesPontosTuristicos(dataGridViewVerificacoesAdicionaisVerificacaoLocal.CurrentRow.Index);
                exibirHorarioFuncionamentoAbertura(dataGridViewHorariosAdicionaisVerificacaoLocal.CurrentRow.Index);
                exibirHorarioFuncionamentoFechamento(dataGridViewHorariosAdicionaisVerificacaoLocal.CurrentRow.Index);
                if (dataGridViewTrilhasAdicionaisVerificacaoLocal.CurrentRow != null)
                {
                    exibirTrilhas(dataGridViewTrilhasAdicionaisVerificacaoLocal.CurrentRow.Index);
                }
            }
        }

        public void exibirVerificacoesPontosTuristicos(int i)
        {
            txt_descricaoAdicionaisVerificacaoLocal.Text = "" + dataGridViewVerificacoesAdicionaisVerificacaoLocal[2, i].Value;
            txt_latitudeAdicionaisVerificacaoLocal.Text = "" + dataGridViewVerificacoesAdicionaisVerificacaoLocal[10, i].Value;
            txt_longitudeAdicionaisVerificacaoLocal.Text = "" + dataGridViewVerificacoesAdicionaisVerificacaoLocal[11, i].Value;
        }

        public void exibirHorarioFuncionamentoAbertura(int i)
        {
            string[] diasDaSemana = { "segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo" };

            for (int j = 0; j < diasDaSemana.Length; j++)
            {
                var valor = dataGridViewHorariosAdicionaisVerificacaoLocal[17, j].Value;
                var txtBox = this.Controls.Find($"txt_{diasDaSemana[j]}AberturaAdicionaisVerificacaoLocal", true).FirstOrDefault() as TextBox;
                if (txtBox != null)
                {
                    txtBox.Text = valor?.ToString();
                }
            }
        }

        public void exibirHorarioFuncionamentoFechamento(int i)
        {
            string[] diasDaSemana = { "segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo" };

            for (int j = 0; j < diasDaSemana.Length; j++)
            {
                var valor = dataGridViewHorariosAdicionaisVerificacaoLocal[17, j].Value;
                var txtBox = this.Controls.Find($"txt_{diasDaSemana[j]}FechamentoAdicionaisVerificacaoLocal", true).FirstOrDefault() as TextBox;

                if (txtBox != null)
                {
                    txtBox.Text = valor?.ToString();
                }
            }
        }

        public void exibirTrilhas(int i)
        {
            txt_distanciaAdicionaisVerificacaoLocal.Text = "" + dataGridViewTrilhasAdicionaisVerificacaoLocal[17, i].Value;
            txt_dificuldadeAdicionaisVerificacaoLocal.Text = "" + dataGridViewTrilhasAdicionaisVerificacaoLocal[19, i].Value;
            txt_tempoEstimadoAdicionaisVerificacaoLocal.Text = "" + dataGridViewTrilhasAdicionaisVerificacaoLocal[20, i].Value;
        }

        private void btn_voltarPanelVerificacaoLocal_Click(object sender, EventArgs e)
        {
            int id = _id;
            bool acesso = true;
            frm_verificacaoLocalDadosGerais form = new frm_verificacaoLocalDadosGerais(id, acesso);
            form.Show();
            this.Hide();
        }

        private void btn_continuarVerificacaoLocal_Click(object sender, EventArgs e)
        {
            int id = _id;
            string nome = _nome;
            string email = _email;

            int idFotos = _idFotos;
            string nomeFotos = _nomeFotos;
            string emailFotos = _emailFotos;

            if(_acesso != true)
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
    }
}
