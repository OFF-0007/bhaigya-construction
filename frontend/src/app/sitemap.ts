import { MetadataRoute } from 'next';

const CITIES = [
  'Charaideo', 'Charaideo Maidam', 'Dilighat', 'Sivasagar Tank', 'Borhat Bazar', 'Borpatra Pukhuri', 'Namrup', 'Dhemaji', 'Gerukamukh', 'Malini Than', 'Simen Chapori', 'Jiadhal River', 'Bordoloni', 'Poba Reserve', 'Akashi Ganga', 'Dibrugarh', 'Bogibeel Bridge', 'Jeypore Rainforest', 'Jokai Botanical', 'Namphake', 'Dinjoy Satra', 'Chabua', 'Dehing Patkai', 'Mancotta', 'Golaghat', 'Kaziranga', 'Garampani', 'Deopahar', 'Nambor', 'Kakochang', 'Negheriting', 'Numaligarh', 'Dhansiri', 'Jorhat', 'Majuli', 'Tocklai', 'Hoollongapar', 'Dhekiakhowa', 'Nimati Ghat', 'Auniati Satra', 'Kamalabari Satra', 'Sivasagar', 'Rang Ghar', 'Talatal Ghar', 'Kareng Ghar', 'Sivadol', 'Joysagar', 'Tinsukia', 'Dibru-Saikhowa', 'Digboi', 'Margherita', 'Dhola-Sadiya',
  'Biswanath', 'Biswanath Ghat', 'Monabarie', 'Nagsankar', 'Maa Kalyani', 'Gangmau Than', 'Borgang', 'Darrang', 'Orang National Park', 'Patharughat', 'Mangaldai', 'Khoirabari', 'Bhergaon', 'Sonitpur', 'Agnigarh', 'Mahabhairav', 'Chitralekha Udyan', 'Da-Parbatia', 'Bamuni Hills', 'Nameri', 'Bhalukpung', 'Kalia Bhomora', 'Tezpur', 'Udalguri', 'Bhairabkunda', 'Bornadi', 'Gethsemane',
  'Bajali', 'Pathsala', 'Bhabanipur', 'Baksa', 'Mushalpur', 'Bogamati', 'Daragaon', 'Barpeta', 'Sundaridiya', 'Beki River', 'Bongaigaon', 'Kakoijana', 'Jogighopa', 'Abhayapuri', 'Chirang', 'Bijni', 'Dhubri', 'Asharikandi', 'Mahamaya Dham', 'Chakrashila', 'Goalpara', 'Sri Surya Pahar', 'Urpod Beel', 'Kamrup', 'Madan Kamdev', 'Hajo', 'Sualkuchi', 'Chhaygaon', 'Chandubi Lake', 'Deepor Beel', 'Guwahati', 'Kamakhya Temple', 'Umananda', 'Basistha', 'Kokrajhar', 'Gossaigaon', 'Raimona', 'Nalbari', 'Billeshwar', 'Daulashal', 'South Salmara-Mankachar', 'Mankachar', 'Tamulpur',
  'Hojai', 'Akashiganga', 'Lumding', 'Morigaon', 'Pobitora', 'Mayong', 'Jagiroad', 'Nagaon', 'Maha Mrityunjay Temple', 'Batadrawa', 'Laokhowa', 'Kaliabor', 'Karbi Anglong', 'Diphu', 'Taralangso', 'West Karbi Anglong', 'Panimur Falls', 'Hamren', 'Cachar', 'Silchar', 'Khaspur', 'Barak River', 'Dolu Lake', 'Dima Hasao', 'Haflong', 'Jatinga', 'Umrangso', 'Maibong', 'Hailakandi', 'Badarpur Fort', 'Karimganj', 'Sribhumi', 'Son Beel'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bhaigyaconstruction.com';
  const lastModified = new Date();

  const cityUrls: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${baseUrl}/locations/${city.toLowerCase().replace(/ /g, '-')}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${baseUrl}/branches`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.70,
    },
    ...cityUrls,
  ];
}
