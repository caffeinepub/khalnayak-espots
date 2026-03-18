async function fetchFFPlayerByUID(uid, region = "ind") {
  var _a, _b;
  if (!uid || !/^\d{8,12}$/.test(uid)) {
    return { success: false, error: "invalid_uid" };
  }
  try {
    const response = await fetch(
      `https://developers.freefirecommunity.com/api/v1/info?region=${region}&uid=${uid}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(8e3)
      }
    );
    if (response.ok) {
      const data = await response.json();
      const nickname = (data == null ? void 0 : data.nickname) || ((_a = data == null ? void 0 : data.basic_info) == null ? void 0 : _a.nickname);
      if (nickname) {
        return {
          success: true,
          player: {
            nickname,
            uid,
            region,
            level: data.level || ((_b = data == null ? void 0 : data.basic_info) == null ? void 0 : _b.level),
            likes: data.likes
          }
        };
      }
      return { success: false, error: "invalid_uid", manualFallback: true };
    }
    if (response.status === 404 || response.status === 400) {
      return { success: false, error: "invalid_uid", manualFallback: true };
    }
    return { success: false, error: "network_error", manualFallback: true };
  } catch (err) {
    const isNetwork = err instanceof TypeError || err instanceof Error && (err.name === "AbortError" || err.message.includes("Failed to fetch") || err.message.includes("NetworkError") || err.message.includes("CORS"));
    return {
      success: false,
      error: isNetwork ? "network_error" : "unknown",
      manualFallback: true
    };
  }
}
export {
  fetchFFPlayerByUID as f
};
