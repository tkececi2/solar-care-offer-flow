
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface Reference {
  id: string;
  title: string;
  location: string;
  capacity: string;
  features: string[];
  services: string[];
  imageUrl: string;
}

const references: Reference[] = [
  {
    id: "isparta",
    title: "ISPARTA 12 MWP (GES)",
    location: "Isparta",
    capacity: "12 MW",
    features: [
      "9 adet köşk ve trafo binası",
      "String invertör kullanımı",
      "20 hektar alan",
      "40,000+ panel"
    ],
    services: [
      "Tam kapsamlı bakım ve güvenlik",
      "7/24 bakım ve izleme",
      "Aylık performans raporlaması",
      "Drone ile düzenli termal kontroller"
    ],
    imageUrl: "/lovable-uploads/7fd0f0c7-8235-4a7c-a3fe-6a888525fb9b.png"
  },
  {
    id: "burdur-bugduz",
    title: "BURDUR BÜĞDÜZ 6.73 MWP GES",
    location: "Burdur",
    capacity: "6.3 MW",
    features: [
      "2 adet köşk ve trafo binası",
      "String invertör kullanımı",
      "12 hektar alan",
      "22,000+ panel"
    ],
    services: [
      "Tam kapsamlı bakım ve güvenlik",
      "7/24 bakım ve izleme",
      "Periyodik temizlik hizmetleri",
      "Yıllık kapsamlı test ve kontroller"
    ],
    imageUrl: "/lovable-uploads/7fd0f0c7-8235-4a7c-a3fe-6a888525fb9b.png"
  },
  {
    id: "burdur-necati",
    title: "BURDUR NECATİ 20 MWP GES",
    location: "Burdur",
    capacity: "20 MW",
    features: [
      "4 adet köşk ve trafo binası",
      "String invertör kullanımı",
      "35 hektar alan",
      "65,000+ panel"
    ],
    services: [
      "Tam kapsamlı bakım ve güvenlik",
      "7/24 bakım ve izleme",
      "Acil durum müdahale ekibi",
      "Haftalık performans raporlaması"
    ],
    imageUrl: "/lovable-uploads/7fd0f0c7-8235-4a7c-a3fe-6a888525fb9b.png"
  },
  {
    id: "cankiri",
    title: "ÇANKIRI ELDİVAN 14.62 MWP GES",
    location: "Çankırı",
    capacity: "14.62 MW",
    features: [
      "Bölgesel enerji ihtiyacına yönelik tasarım",
      "String invertör kullanımı",
      "30 hektar alan",
      "48,000+ panel"
    ],
    services: [
      "Tam kapsamlı bakım ve güvenlik",
      "7/24 bakım ve izleme",
      "İleri seviye izleme ve raporlama",
      "Periyodik panel temizliği"
    ],
    imageUrl: "/lovable-uploads/7fd0f0c7-8235-4a7c-a3fe-6a888525fb9b.png"
  }
];

export default function ReferencesPage() {
  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-ocean-900 to-ocean-800 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-white">
              <span className="text-solar-500">Referanslarımız</span>
            </h1>
            <p className="text-xl text-white/80">
              Türkiye'nin dört bir yanında hizmet verdiğimiz GES projeleri
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {references.map((reference) => (
            <ReferenceCard key={reference.id} reference={reference} />
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Neden Bizi Tercih Etmelisiniz?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-border">
              <h3 className="text-xl font-bold mb-3 text-ocean-800">Deneyimli Ekip</h3>
              <p className="text-muted-foreground mb-4">
                10+ yıllık GES bakım ve işletme deneyimine sahip uzman ekip ile hizmet veriyoruz.
              </p>
              <ul className="space-y-2">
                <ListItem text="Mühendis kadromuz ile teknik danışmanlık" />
                <ListItem text="Sertifikalı teknisyenlerimiz ile yerinde bakım" />
                <ListItem text="Proje yöneticilerimiz ile süreç takibi" />
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-border">
              <h3 className="text-xl font-bold mb-3 text-ocean-800">Modern Teknoloji</h3>
              <p className="text-muted-foreground mb-4">
                En son teknoloji ekipmanlar ile GES'lerinizin performansını sürekli izliyor ve optimize ediyoruz.
              </p>
              <ul className="space-y-2">
                <ListItem text="Drone ile havadan termal görüntüleme" />
                <ListItem text="7/24 SCADA izleme sistemleri" />
                <ListItem text="İleri seviye veri analizi yazılımları" />
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-border">
              <h3 className="text-xl font-bold mb-3 text-ocean-800">Müşteri Odaklı Hizmet</h3>
              <p className="text-muted-foreground mb-4">
                Her santral için özelleştirilmiş çözümler ve esnek hizmet paketleri sunuyoruz.
              </p>
              <ul className="space-y-2">
                <ListItem text="Özel ihtiyaçlara göre şekillendirilmiş paketler" />
                <ListItem text="Hızlı müdahale garantisi" />
                <ListItem text="Şeffaf raporlama ve iletişim" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

interface ReferenceCardProps {
  reference: Reference;
}

const ReferenceCard = ({ reference }: ReferenceCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-64 bg-ocean-900 rounded-t-lg overflow-hidden">
        <img 
          src={reference.imageUrl} 
          alt={reference.title} 
          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white">{reference.title}</h3>
          <p className="text-white/80">
            {reference.location} - {reference.capacity}
          </p>
        </div>
      </div>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div>
          <h4 className="font-bold text-lg mb-3 text-ocean-800">Santral Özellikleri</h4>
          <ul className="space-y-2">
            {reference.features.map((feature, index) => (
              <ListItem key={`feature-${index}`} text={feature} />
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-3 text-ocean-800">Verdiğimiz Hizmetler</h4>
          <ul className="space-y-2">
            {reference.services.map((service, index) => (
              <ListItem key={`service-${index}`} text={service} />
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

const ListItem = ({ text }: { text: string }) => {
  return (
    <li className="flex items-start">
      <CheckCircle className="text-solar-500 h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
      <span>{text}</span>
    </li>
  );
};
