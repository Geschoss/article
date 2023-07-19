// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite(bgImg, fgImg, fgOpac, fgPos) {
  console.log({ bgImg, fgImg, fgOpac, fgPos });
  const length = bgImg.data.length;
  for (let i = 0; i < length; i++) {
    let color_b = bgImg.data[i];
    let color_f = fgImg.data[i];
    bgImg.data[i] = screen_blending(color_f, color_b, fgOpac, 1);
  }
}

function aplha_blending(color_f, color_b, alpha_f, alpha_b) {
  const alpha = alpha_f + (1 - alpha_f) * alpha_b;
  return (alpha_f * color_f + (1 - alpha_f) * color_b * alpha_b) / alpha;
}

function additive_blending(color_f, color_b, alpha_f, alpha_b) {
  const alpha = clamp(alpha_f + alpha_b);
  return (alpha_f * color_f + alpha_b * color_b) / alpha;
}

function difference_blending(color_f, color_b, alpha_f, alpha_b) {
  const alpha = clamp(alpha_f + alpha_b);
  return abs((alpha_f * color_f - alpha_b * color_b) / alpha);
}

function multiply_blending(color_f, color_b, alpha_f, alpha_b) {
  return alpha_f * (color_f * color_b) + (1 - alpha_f) * color_b;
}

function screen_blending(color_f, color_b, alpha_f, alpha_b) {
  return 1 - (1 - color_f) * (1 - color_b);
}
// utils
function clamp(v) {
  if (v > 1) {
    return 1;
  }
  return v;
}
function abs(v) {
  if (v < 0) {
    return v * -1;
  }
  return v;
}
