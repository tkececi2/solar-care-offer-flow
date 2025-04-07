
import { MainLayout } from "@/components/layout/MainLayout";
import { CheckCircle, Users, Award, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Hakkımızda</h1>
            <p className="text-xl text-muted-foreground">
              GES Bakım olarak, güneş enerji santrallerinizin verimliliğini 
              maksimum seviyede tutmak için profesyonel bakım ve işletme 
              hizmetleri sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold mb-4">Misyonumuz</h2>
              <p className="text-muted-foreground">
                GES sahiplerinin yatırım getirilerini maksimize etmek ve 
                güneş santrallerinin ömrünü uzatmak amacıyla profesyonel 
                bakım hizmetleri sunmak.
              </p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-start">
                  <CheckCircle className="text-secondary h-5 w-5 mt-1 mr-2" />
                  <span>Santrallerin üretim performansını artırmak</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-secondary h-5 w-5 mt-1 mr-2" />
                  <span>Arızaları önleyerek beklenmedik maliyetleri azaltmak</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-secondary h-5 w-5 mt-1 mr-2" />
                  <span>Şeffaf ve detaylı raporlamalarla müşteri güveni sağlamak</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-secondary h-5 w-5 mt-1 mr-2" />
                  <span>Doğru test ve bakım protokolleriyle sistem ömrünü uzatmak</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold mb-4">Vizyonumuz</h2>
              <p className="text-muted-foreground">
                Türkiye'nin güneş enerjisi sektöründe bakım ve işletme 
                alanında öncü firma olmak ve yenilenebilir enerji sektörünün 
                büyümesine katkıda bulunmak.
              </p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-start">
                  <CheckCircle className="text-secondary h-5 w-5 mt-1 mr-2" />
                  <span>İnovatif teknolojilerle bakım süreçlerini sürekli geliştirmek</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-secondary h-5 w-5 mt-1 mr-2" />
                  <span>Sektörde en güncel test ve teşhis ekipmanlarını kullanmak</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-secondary h-5 w-5 mt-1 mr-2" />
                  <span>Yenilenebilir enerji eğitimi ve bilinçlendirme çalışmaları yapmak</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-secondary h-5 w-5 mt-1 mr-2" />
                  <span>Güneş enerji sektöründeki iyi uygulamaları yaygınlaştırmak</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Değerlerimiz */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Değerlerimiz</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Müşteri Odaklılık</h3>
              <p className="text-muted-foreground">
                Müşterilerimizin ihtiyaçlarını anlamak ve onlara özel çözümler 
                sunmak önceliğimizdir. Her projede müşteri memnuniyetini en 
                üst düzeyde tutmaya çalışırız.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Award className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Kalite ve Uzmanlık</h3>
              <p className="text-muted-foreground">
                Her işimizde en yüksek kalite standartlarını uygular, teknik 
                ekibimizin sürekli eğitimlerle güncel bilgi ve becerilerle 
                donatılmasını sağlarız.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShieldCheck className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Güvenilirlik</h3>
              <p className="text-muted-foreground">
                Verdiğimiz sözleri tutarak ve şeffaf iletişim kurarak müşterilerimizle 
                güvene dayalı uzun vadeli ilişkiler kurarız. Dürüstlük 
                ve açıklık, iş modelimizin temelidir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ekibimiz */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Uzman Ekibimiz</h2>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            GES bakım ve işletme konusunda uzmanlaşmış deneyimli kadromuzla 
            santrallerinizin her zaman optimum performansta çalışmasını sağlıyoruz.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ekip üyeleri için yer tutucu */}
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 bg-muted rounded-full overflow-hidden mb-4">
                <img src="/placeholder.svg" alt="Ekip üyesi" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold">Ahmet Yılmaz</h3>
              <p className="text-muted-foreground">Teknik Direktör</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 bg-muted rounded-full overflow-hidden mb-4">
                <img src="/placeholder.svg" alt="Ekip üyesi" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold">Mehmet Kaya</h3>
              <p className="text-muted-foreground">Operasyon Müdürü</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 bg-muted rounded-full overflow-hidden mb-4">
                <img src="/placeholder.svg" alt="Ekip üyesi" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold">Ayşe Demir</h3>
              <p className="text-muted-foreground">Müşteri İlişkileri Yöneticisi</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
