using MySql.Data.MySqlClient;
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
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;

namespace desktopValeotour
{
    public partial class frm_verificacaoLocalFotos : Form
    {
        public frm_verificacaoLocalFotos()
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

        public frm_verificacaoLocalFotos(int id, string nome, string email)
        {
            InitializeComponent();
            _id = id;
            _nome = nome;
            _email = email;
        }

        public frm_verificacaoLocalFotos(bool acesso, string nomeFotos, string emailFotos, int idFotos)
        {
            InitializeComponent();
            _acesso = acesso;
            _idFotos = idFotos;
            _nomeFotos = nomeFotos;
            _emailFotos = emailFotos;
        }

        private void frm_verificacaoLocalFotos_Load(object sender, EventArgs e)
        {
            int id;
            string nome;
            string email;

            if(_id != 0)
            {
                id = _id;
                nome = _nome;
                email = _email;
            }
            else
            {
                id = _idFotos;
                nome = _nomeFotos;
                email = _emailFotos;
            }

            l.setId_ponto_turistico(id);

            //panel
            txt_nomePanelVerificacaoLocal.Text = nome;
            txt_emailPanelVerificacaoLocal.Text = email;

            MySqlConnection conn = null;
            string strConn = @"Server=localhost;Database=valeotour;Uid=root;Pwd='';Connect Timeout=30;";
            conn = new MySqlConnection(strConn);
            conn.Open();

            string mSQL = "select * from pontos_turisticos where id_ponto_turistico = '" + id + "'";
            MySqlCommand cmd = new MySqlCommand(mSQL, conn);
            MySqlDataAdapter da = new MySqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            string image = dt.Rows[0]["foto_principal_pt"].ToString();
            pic_imagemPerfil.ImageLocation = "C:/xampp/htdocs/valeOTour/pontos_turisticos/assets/" + image;
            pic_imagemPerfil.SizeMode = PictureBoxSizeMode.Zoom;


            //fotos
            string _mSQL = "SELECT pt.*, f.*, v.status_verificacao_pt FROM pontos_turisticos pt INNER JOIN fotos_pontos_turisticos f ON pt.id_ponto_turistico = f.id_ponto_turistico INNER JOIN verificacoes_pontos_turisticos v ON pt.id_ponto_turistico = v.id_ponto_turistico WHERE f.id_ponto_turistico = '" + _id + "'";
            MySqlCommand _cmd = new MySqlCommand(_mSQL, conn);
            MySqlDataAdapter _da = new MySqlDataAdapter(_cmd);
            DataTable _dt = new DataTable();
            _da.Fill(_dt);

            for (int i = 0; i < 8; i++)
            {
                if (_dt.Rows.Count > i)
                {
                    string fotosSecundarias = _dt.Rows[i]["caminho_imagem_pt"].ToString();
                    string imagePath = "C:/xampp/htdocs/valeOTour/pontos_turisticos/assets/" + fotosSecundarias;
                    
                    switch (i)
                    {
                        case 0:
                            pic_foto1.ImageLocation = imagePath;
                            pic_foto1.SizeMode = PictureBoxSizeMode.Zoom;
                            break;
                        case 1:
                            pic_foto2.ImageLocation = imagePath;
                            pic_foto2.SizeMode = PictureBoxSizeMode.Zoom;
                            break;
                        case 2:
                            pic_foto3.ImageLocation = imagePath;
                            pic_foto3.SizeMode = PictureBoxSizeMode.Zoom;
                            break;
                        case 3:
                            pic_foto4.ImageLocation = imagePath;
                            pic_foto4.SizeMode = PictureBoxSizeMode.Zoom;
                            break;
                        case 4:
                            pic_foto5.ImageLocation = imagePath;
                            pic_foto5.SizeMode = PictureBoxSizeMode.Zoom;
                            break;
                        case 5:
                            pic_foto6.ImageLocation = imagePath;
                            pic_foto6.SizeMode = PictureBoxSizeMode.Zoom;
                            break;
                        case 6:
                            pic_foto7.ImageLocation = imagePath;
                            pic_foto7.SizeMode = PictureBoxSizeMode.Zoom;
                            break;
                        case 7:
                            pic_foto8.ImageLocation = imagePath;
                            pic_foto8.SizeMode = PictureBoxSizeMode.Zoom;
                            break;
                    }
                }
            }
        }

        private void btn_sairFotosVerificacaoLocal_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Deseja sair ?", "ValeOTour", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                Application.Exit();
            }
        }

        private void btn_verificarVerificacaoLocal_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Deseja verificar o guia ?", "ValeOTour", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                try
                {
                    l.setStatus_verificacao_pt("Aprovado");
                    l.setNome_v("Aprovado");
                    l.setDescricao_v("Aprovado");
                    l.setTipo_v("Aprovado");
                    l.setRua_v("Aprovado");
                    l.setEmail_v("Aprovado");
                    l.setBairro_v("Aprovado");
                    l.setNumero_v("Aprovado");
                    l.setCidade_v("Aprovado");
                    l.setLatitude_v("Aprovado");
                    l.setLongitude_v("Aprovado");
                    l.setFoto_principal_v("Aprovado");
                    l.setTelefone_v("Aprovado");
                    l.setEixo_v("Aprovado");

                    l.setId_ponto_turistico(_id);
                    l.verificar_locais();

                }
                finally
                {
                    MessageBox.Show("Verificação enviada com sucesso!");
                    frm_principal form = new frm_principal();
                    form.Show();
                    this.Hide();
                }
            }
        }

        private void btn_negarVerificacaoLocal_Click(object sender, EventArgs e)
        {
            int id = _id;
            string nome = _nome;
            string email = _email;

            int idFotos = _idFotos;
            string nomeFotos = _nomeFotos;
            string emailFotos = _emailFotos;

            if (_acesso != true)
            {
                frm_erroLocal form = new frm_erroLocal(id, nome, email);
                form.Show();
                this.Hide();
            }
            else
            {
                frm_erroLocal form = new frm_erroLocal(idFotos, nomeFotos, emailFotos);
                form.Show();
                this.Hide();
            }
        }

        private void btn_voltarPanelVerificacaoLocal_Click(object sender, EventArgs e)
        {
            int idFotos = _id;
            bool acesso = true;
            string nomeFotos = _nome;
            string emailFotos = _email;

            frm_verificacaoLocalAdicionais form = new frm_verificacaoLocalAdicionais(acesso, idFotos, nomeFotos, emailFotos);
            form.Show();
            this.Hide();
        }
    }
}
