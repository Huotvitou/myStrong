// ✅ Dynamic API base (no code change after deploy)
(function(){
  const saved = localStorage.getItem('api_base');
  window.API_BASE = saved || 'https://REPLACE-BACKEND-URL/api'; // ប្ដូរ ឬ កំណត់នៅ /settings
})();